import type {
  MatchResult,
  Program,
  Recommendation,
  University,
  UserProfile
} from '../../lib/types'
import { hardFilter } from './filter'
import { computeScore } from './scoring'

export const MIN_SCORE = 45
export const TOP_N = 5
export const OPTIMAL_COUNT = 3

function byScoreDesc(a: { rec: Recommendation }, b: { rec: Recommendation }): number {
  if (b.rec.score !== a.rec.score) return b.rec.score - a.rec.score
  return a.rec.programId.localeCompare(b.rec.programId)
}

/**
 * The full pipeline: profile -> hard filter -> scoring -> soft gate -> top N.
 * Deterministic by construction: same profile in, same order out.
 */
export function recommend(
  profile: UserProfile,
  uniMap: Record<string, University>,
  programs: Program[],
  now: Date = new Date()
): MatchResult {
  const { kept, removedByBudget } = hardFilter(programs, uniMap, profile)

  const scored = kept
    .map((p) => {
      const uni = uniMap[p.universityId]
      if (!uni) return null
      const s = computeScore(p, uni, profile, now)
      const rec: Recommendation = {
        programId: p.id,
        universityId: p.universityId,
        score: s.score,
        fit: s.fit,
        confidence: s.confidence,
        breakdown: s.breakdown,
        warnings: s.warnings,
        sourceIds: p.sourceIds
      }
      return { rec, gated: s.gated, gateRatio: s.gateRatio }
    })
    .filter((x): x is { rec: Recommendation; gated: boolean; gateRatio: number } => x !== null)

  const eligible = scored
    .filter((x) => !x.gated && x.rec.score >= MIN_SCORE)
    .sort(byScoreDesc)
    .slice(0, TOP_N)
    .map((x) => x.rec)

  const relaxed = scored
    .filter((x) => x.gated || x.rec.score < MIN_SCORE || !eligible.includes(x.rec))
    .sort(byScoreDesc)
    .slice(0, TOP_N)
    .map((x) => x.rec)

  const notes = buildNotes(removedByBudget.length, eligible.length)

  return { items: eligible, relaxed, notes, totalEvaluated: scored.length }
}

function buildNotes(removedCount: number, found: number): string[] {
  const notes: string[] = []
  if (removedCount > 0) {
    notes.push(
      `${removedCount} program${removedCount > 1 ? 's were' : ' was'} removed: net cost is far above your budget with no scholarship path.`
    )
  }
  if (found < OPTIMAL_COUNT) {
    notes.push(`Only ${found} strong match${found === 1 ? '' : 'es'} found — relaxed options are shown below.`)
  }
  return notes
}

export interface Suggestion {
  kind: 'budget' | 'country' | 'field' | 'exam'
  text: string
}

/**
 * Concrete, deterministic remedies when nothing (or too little) fits.
 * Never invent options — every suggestion is derived from the real dataset.
 */
export function buildSuggestions(
  profile: UserProfile,
  uniMap: Record<string, University>,
  programs: Program[],
  now: Date = new Date()
): Suggestion[] {
  const suggestions: Suggestion[] = []

  const relaxed = programs
    .map((p) => {
      const uni = uniMap[p.universityId]
      if (!uni) return null
      return { p, uni, s: computeScore(p, uni, profile, now) }
    })
    .filter((x): x is { p: Program; uni: University; s: ReturnType<typeof computeScore> } => x !== null)
    .sort((a, b) => b.s.score - a.s.score)

  const moneyGap = relaxed
    .filter((x) => x.p.netTuitionUsdPerYear > profile.budgetUsdPerYear)
    .map((x) => x.p.netTuitionUsdPerYear - profile.budgetUsdPerYear)
  if (moneyGap.length) {
    const gap = Math.round(Math.min(...moneyGap) / 500) * 500
    if (gap > 0) suggestions.push({ kind: 'budget', text: `Raising your budget by about $${gap.toLocaleString('en-US')}/year unlocks the cheapest blocked option.` })
  }

  const countryCandidates = new Map<string, number>()
  for (const x of relaxed) {
    if (!profile.targetCountries.includes(x.uni.country) && x.s.score >= 60) {
      countryCandidates.set(x.uni.country, Math.max(countryCandidates.get(x.uni.country) ?? 0, x.s.score))
    }
  }
  if (countryCandidates.size) {
    const best = Array.from(countryCandidates.entries()).sort((a, b) => b[1] - a[1])[0]
    suggestions.push({ kind: 'country', text: `Adding ${best[0]} to your target countries would surface strong options (best local score ${Math.round(best[1])}).` })
  }

  const examGap = relaxed.find((x) => x.s.breakdown.find((f) => f.key === 'academic' && f.normalized < 0.75))
  if (examGap) {
    suggestions.push({ kind: 'exam', text: `Improving your exam scores would lift several programs — start with ${PROGRAM_LABEL(examGap.p)}.` })
  }

  return suggestions.slice(0, 3)
}

function PROGRAM_LABEL(p: Program): string {
  return p.name
}
