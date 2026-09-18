import type {
  ExamId,
  Program,
  Recommendation,
  Roadmap,
  RoadmapStep,
  RoadmapTemplate,
  University,
  UserProfile
} from '../../lib/types'
import { addDays } from '../../lib/format'
import { computeNextAction } from '../progress/progressStore'

const PHASE_ORDER: Record<RoadmapStep['phase'], number> = {
  exams: 0,
  documents: 1,
  deadlines: 2,
  academic: 3,
  activities: 4
}

export interface BuildRoadmapInput {
  profile: UserProfile
  recommendations: Recommendation[]
  programMap: Record<string, Program>
  uniMap: Record<string, University>
  templates: RoadmapTemplate[]
  now?: Date
}

export function buildRoadmap(input: BuildRoadmapInput): Roadmap {
  const { profile, recommendations, programMap, uniMap, templates } = input
  const now = input.now ?? new Date()

  const selected = recommendations.slice(0, 3)
  const picked = selected
    .map((r) => ({ rec: r, program: programMap[r.programId], uni: uniMap[r.universityId] }))
    .filter((x): x is { rec: Recommendation; program: Program; uni: University } =>
      Boolean(x.program && x.uni)
    )

  const items: RoadmapStep[] = []
  let seq = 0
  const nextId = (p: string) => `${p}-${++seq}`

  const appDeadlines = picked.flatMap((x) =>
    x.program.deadlines.filter((d) => d.kind === 'application' || d.kind === 'documents')
  )
  const earliest = appDeadlines
    .map((d) => d.date)
    .sort()[0] as string | undefined

  const tpl = (phase: RoadmapStep['phase'], trigger: string) =>
    templates.find((t) => t.phase === phase && t.trigger === trigger)
  const tplByPhase = (phase: RoadmapStep['phase']) => templates.find((t) => t.phase === phase)

  // ---- exams ---------------------------------------------------------------
  let examGap: { exam: ExamId; min: number } | null = null
  for (const x of picked) {
    for (const req of x.program.requirements.exams) {
      const cur = profile.examScores[req.exam]
      if (cur == null || cur < req.minScore) {
        if (!examGap || req.minScore > examGap.min) examGap = { exam: req.exam, min: req.minScore }
      }
    }
  }
  const hasAnyScore = Object.keys(profile.examScores).length > 0

  if (examGap) {
    const base = tpl('exams', 'gap')
    const cur = profile.examScores[examGap.exam]
    items.push({
      id: nextId('ex'),
      phase: 'exams',
      title: `Reach ${examGap.exam} ${examGap.min.toFixed(1)}${cur != null ? ` (you have ${cur.toFixed(1)})` : ' (no score yet)'}`,
      description: base?.description ?? 'Close the gap between your current exam score and the requirement.',
      dueDate: earliest ? addDays(earliest, -75) : undefined,
      status: 'todo',
      priority: 1,
      sourceIds: ['src-ielts']
    })
  } else if (!hasAnyScore) {
    const base = tpl('exams', 'always')
    items.push({
      id: nextId('ex'),
      phase: 'exams',
      title: 'Take the required standardised exam',
      description: base?.description ?? 'Sit the exam before the application windows close.',
      dueDate: earliest ? addDays(earliest, -75) : undefined,
      status: 'todo',
      priority: 1,
      sourceIds: ['src-ielts']
    })
  }

  // ---- documents -----------------------------------------------------------
  const docOffsets: Record<string, number> = {
    'Prepare your academic transcript and GPA report': -60,
    'Write your motivation letter': -50,
    'Request two recommendation letters': -45,
    'Prepare your passport and ID documents': -35
  }
  for (const t of templates.filter((x) => x.phase === 'documents')) {
    items.push({
      id: nextId('doc'),
      phase: 'documents',
      title: t.title,
      description: t.description,
      dueDate: earliest ? addDays(earliest, docOffsets[t.title] ?? -40) : undefined,
      status: 'todo',
      priority: t.priority,
      sourceIds: []
    })
  }

  // ---- program deadlines ---------------------------------------------------
  for (const x of picked) {
    for (const d of x.program.deadlines) {
      const isScholarship = d.kind === 'scholarship'
      const title = isScholarship
        ? `Apply for funding — ${x.uni.name}`
        : d.kind === 'documents'
          ? `Submit documents — ${x.uni.name} (${x.program.name})`
          : `Submit application — ${x.uni.name} (${x.program.name})`
      items.push({
        id: nextId('dl'),
        phase: 'deadlines',
        title,
        description: `${d.label} · ${x.program.name}. ${d.isDemo ? 'Demonstrative date — verify on the official page.' : 'Verified date.'}`,
        dueDate: d.date,
        status: 'todo',
        priority: isScholarship ? 1 : 1,
        linkedProgramId: x.program.id,
        sourceIds: d.sourceId ? [d.sourceId] : x.program.sourceIds,
        isDemo: d.isDemo
      })
    }
  }

  // ---- funding strategy ----------------------------------------------------
  const needsFunding =
    profile.needsScholarship &&
    recommendations.some(
      (r) => (programMap[r.programId]?.netTuitionUsdPerYear ?? 0) > profile.budgetUsdPerYear
    )
  if (needsFunding) {
    const base = tpl('deadlines', 'scholarship')
    const scholarshipDeadline = picked
      .flatMap((x) => x.program.deadlines)
      .filter((d) => d.kind === 'scholarship')
      .map((d) => d.date)
      .sort()[0]
    items.push({
      id: nextId('fund'),
      phase: 'deadlines',
      title: base?.title ?? 'Apply for a scholarship',
      description: base?.description ?? 'Your budget is below the tuition cost of a shortlisted program.',
      dueDate: scholarshipDeadline ?? earliest,
      status: 'todo',
      priority: 1,
      sourceIds: []
    })
  }

  // ---- academic ------------------------------------------------------------
  const gpaGap = picked.some((x) => {
    const min = x.program.requirements.minGpa
    return min != null && profile.gpa < min
  })
  const academicTpl = gpaGap ? tpl('academic', 'gap') : tpl('academic', 'always')
  if (academicTpl) {
    const targetGpa = Math.max(...picked.map((x) => x.program.requirements.minGpa ?? 0), profile.gpa)
    items.push({
      id: nextId('ac'),
      phase: 'academic',
      title: gpaGap
        ? `Raise your GPA to ${targetGpa.toFixed(2)} (now ${profile.gpa.toFixed(2)})`
        : academicTpl.title,
      description: academicTpl.description,
      dueDate: undefined,
      status: 'todo',
      priority: academicTpl.priority,
      sourceIds: []
    })
  }

  // ---- activities ----------------------------------------------------------
  for (const t of templates.filter((x) => x.phase === 'activities')) {
    items.push({
      id: nextId('act'),
      phase: 'activities',
      title: t.title,
      description: t.description,
      dueDate: undefined,
      status: 'todo',
      priority: t.priority,
      sourceIds: []
    })
  }

  items.sort((a, b) => {
    if (PHASE_ORDER[a.phase] !== PHASE_ORDER[b.phase]) return PHASE_ORDER[a.phase] - PHASE_ORDER[b.phase]
    if (a.priority !== b.priority) return a.priority - b.priority
    const da = a.dueDate ? new Date(a.dueDate).getTime() : Number.POSITIVE_INFINITY
    const db = b.dueDate ? new Date(b.dueDate).getTime() : Number.POSITIVE_INFINITY
    return da - db
  })

  const statuses: Record<string, RoadmapStep['status']> = {}
  items.forEach((s) => (statuses[s.id] = s.status))

  return {
    id: 'rm-' + now.toISOString().slice(0, 10) + '-' + Math.random().toString(36).slice(2, 6),
    profileId: profile.id,
    programIds: picked.map((x) => x.program.id),
    createdAt: now.toISOString(),
    items,
    nextActionId: computeNextAction(items, statuses)
  }
}
