import type {
  Confidence,
  Field,
  Fit,
  Program,
  ScoreFactor,
  ScoreFactorKey,
  University,
  UserProfile
} from '../../lib/types'
import { clamp01, monthsUntil } from '../../lib/format'

export const WEIGHTS: Record<ScoreFactorKey, number> = {
  budget: 0.25,
  field: 0.22,
  country: 0.15,
  academic: 0.15,
  language: 0.1,
  deadline: 0.08,
  scholarship: 0.05
}

export const FACTOR_LABELS: Record<ScoreFactorKey, string> = {
  budget: 'Budget fit',
  field: 'Subject match',
  country: 'Destination',
  academic: 'Academic fit',
  language: 'Language readiness',
  deadline: 'Timeline feasibility',
  scholarship: 'Funding available'
}

/**
 * Sub-weights inside the `academic` factor. The GPA and the exam block keep
 * fixed shares, so adding another exam score never dilutes the GPA's influence.
 */
export const GPA_SUBWEIGHT = 0.4

/**
 * Adjacent disciplines that score 0.5 instead of 0. They exist because a
 * student applying for CS is still meaningfully served by an engineering or
 * design programme, whereas business or medicine are genuinely different paths.
 * Keeping them here (instead of a hard filter) is what makes the shortlist
 * re-order rather than empty out when the discipline changes.
 */
const RELATED_FIELDS: Record<Field, Field[]> = {
  cs: ['engineering', 'design'],
  engineering: ['cs', 'medicine'],
  business: ['humanities'],
  humanities: ['business'],
  medicine: ['engineering'],
  design: ['cs']
}

export interface ScoreResult {
  score: number
  fit: Fit
  confidence: Confidence
  breakdown: ScoreFactor[]
  warnings: string[]
  gated: boolean
  gateRatio: number
}

function normalizeBudget(netTuition: number, budget: number): number {
  if (budget <= 0) return netTuition <= 0 ? 1 : 0
  if (netTuition <= budget) return 1
  return clamp01(1 - (netTuition - budget) / budget)
}

function normalizeField(programField: Field, profileField: Field): number {
  if (programField === profileField) return 1
  if (RELATED_FIELDS[profileField]?.includes(programField)) return 0.5
  return 0
}

function normalizeCountry(country: string, targets: string[]): number {
  return targets.includes(country) ? 1 : 0
}

function examFit(current: number | undefined, required: number): number | null {
  if (current == null) return null
  if (current >= required) return 1
  return 0.5 * (current / required)
}

function normalizeLanguage(programLanguages: string[], ielts?: number): { value: number; known: boolean } {
  if (programLanguages.includes('en')) {
    if (ielts == null) return { value: 0.6, known: false }
    if (ielts >= 6.5) return { value: 1, known: true }
    if (ielts >= 6) return { value: 0.9, known: true }
    if (ielts >= 5) return { value: 0.6, known: true }
    return { value: 0.4, known: true }
  }
  // Program taught in a language the student has no evidence for (e.g. German only).
  return { value: 0.35, known: true }
}

function normalizeDeadline(program: Program, now: Date): { value: number; known: boolean; months: number } {
  const appDeadlines = program.deadlines.filter((d) => d.kind === 'application')
  if (appDeadlines.length === 0) return { value: 0.6, known: false, months: Number.POSITIVE_INFINITY }
  const months = Math.min(...appDeadlines.map((d) => monthsUntil(d.date, now)))
  let value: number
  if (months < 0) value = 0
  else if (months < 3) value = 0.4
  else if (months < 6) value = 0.6
  else if (months < 9) value = 0.75
  else if (months < 12) value = 0.9
  else value = 1
  return { value, known: true, months }
}

function normalizeScholarship(netTuition: number, budget: number, uni: University): number {
  const need = netTuition > budget
  if (!need) return 0.9
  return uni.scholarshipAvailable ? 0.7 : 0.25
}

function confidenceFrom(availableWeight: number): Confidence {
  if (availableWeight > 0.9) return 'high'
  if (availableWeight >= 0.6) return 'medium'
  return 'low'
}

function fitFrom(score: number): Fit {
  if (score >= 75) return 'high'
  if (score >= 55) return 'medium'
  return 'low'
}

/**
 * Deterministic 7-factor weighted score.
 *
 * Weights: budget 0.25, field 0.22, country 0.15, academic 0.15,
 * language 0.10, deadline 0.08, scholarship 0.05.
 *
 * Rules:
 * - A factor with no data is excluded and its weight is redistributed across the
 *   remaining factors, while `availableWeight` drives the confidence badge.
 * - The academic factor mixes GPA and exams with fixed sub-weights
 *   ({@link GPA_SUBWEIGHT} vs the rest), so one extra exam never changes how much
 *   the GPA counts.
 * - `gated` is true when `current / required < 0.8` on an exam or the GPA; the
 *   caller keeps those programs out of the main shortlist.
 */
export function computeScore(
  program: Program,
  uni: University,
  profile: UserProfile,
  now: Date = new Date()
): ScoreResult {
  const warnings: string[] = []
  const ielts = profile.examScores.IELTS

  // ---- academic ------------------------------------------------------------
  const minGpa = program.requirements.minGpa
  const gpaProvided = profile.gpa > 0
  const gpaFitValue = gpaProvided ? (minGpa ? clamp01(profile.gpa / minGpa) : 1) : null
  const examFits: number[] = []
  for (const req of program.requirements.exams) {
    const cur = profile.examScores[req.exam]
    const fit = examFit(cur, req.minScore)
    if (fit == null) {
      warnings.push(`Confirm your ${req.exam} score — ${req.minScore.toFixed(1)} is required`)
      continue
    }
    examFits.push(fit)
    if (cur! < req.minScore) {
      warnings.push(`${req.exam} ${req.minScore.toFixed(1)} required, you have ${cur!.toFixed(1)}`)
    }
  }
  const examAverage = examFits.length > 0 ? examFits.reduce((a, b) => a + b, 0) / examFits.length : null
  let academicValue = 0.5
  let academicKnown = false
  if (gpaFitValue != null && examAverage != null) {
    academicValue = GPA_SUBWEIGHT * gpaFitValue + (1 - GPA_SUBWEIGHT) * examAverage
    academicKnown = true
  } else if (gpaFitValue != null) {
    academicValue = gpaFitValue
    academicKnown = true
  } else if (examAverage != null) {
    academicValue = examAverage
    academicKnown = true
  }
  if (minGpa && gpaProvided && profile.gpa < minGpa) {
    warnings.push(`GPA ${profile.gpa.toFixed(2)} is below the ${minGpa.toFixed(2)} typically expected`)
  }

  const lang = normalizeLanguage(program.languagesOfInstruction, ielts)
  if (!program.languagesOfInstruction.includes('en')) {
    warnings.push(`This program is taught in ${program.languagesOfInstruction.join('/')} — no English track`)
  }

  const dl = normalizeDeadline(program, now)
  if (dl.known && dl.months < 3 && dl.months >= 0) {
    warnings.push('The application window closes in under 3 months')
  }
  if (dl.known && dl.months < 0) {
    warnings.push('The application deadline has already passed')
  }

  const budgetNorm = normalizeBudget(program.netTuitionUsdPerYear, profile.budgetUsdPerYear)
  const need = program.netTuitionUsdPerYear > profile.budgetUsdPerYear
  if (need) {
    warnings.push(
      `Costs ${Math.round(program.netTuitionUsdPerYear - profile.budgetUsdPerYear).toLocaleString('en-US')} USD/year above your budget`
    )
  }

  const countryNorm = normalizeCountry(uni.country, profile.targetCountries)

  const raw: { key: ScoreFactorKey; value: number; known: boolean }[] = [
    { key: 'budget', value: budgetNorm, known: true },
    { key: 'field', value: normalizeField(program.field, profile.field), known: true },
    { key: 'country', value: countryNorm, known: true },
    { key: 'academic', value: academicValue, known: academicKnown },
    { key: 'language', value: lang.value, known: lang.known },
    { key: 'deadline', value: dl.value, known: dl.known },
    { key: 'scholarship', value: normalizeScholarship(program.netTuitionUsdPerYear, profile.budgetUsdPerYear, uni), known: true }
  ]

  const availableWeight = raw.filter((r) => r.known).reduce((a, r) => a + WEIGHTS[r.key], 0)
  const breakdown: ScoreFactor[] = raw.map((r) => {
    const effectiveWeight = r.known && availableWeight > 0 ? WEIGHTS[r.key] / availableWeight : 0
    return {
      key: r.key,
      label: FACTOR_LABELS[r.key],
      weight: WEIGHTS[r.key],
      effectiveWeight,
      normalized: clamp01(r.value),
      contribution: effectiveWeight * clamp01(r.value) * 100,
      known: r.known
    }
  })

  const score = Math.round(breakdown.reduce((a, f) => a + f.contribution, 0) * 10) / 10

  // ---- eligibility gate ----------------------------------------------------
  let gateRatio = 1
  const examRatios: number[] = []
  for (const req of program.requirements.exams) {
    const cur = profile.examScores[req.exam]
    if (cur == null) continue
    examRatios.push(cur / req.minScore)
  }
  const ratios: number[] = [...examRatios]
  if (gpaProvided && minGpa) ratios.push(profile.gpa / minGpa)
  gateRatio = ratios.length ? Math.min(...ratios) : 1
  const gated = gateRatio < 0.8

  return {
    score,
    fit: fitFrom(score),
    confidence: confidenceFrom(availableWeight),
    breakdown,
    warnings: dedupe(warnings),
    gated,
    gateRatio
  }
}

function dedupe(list: string[]): string[] {
  return Array.from(new Set(list))
}
