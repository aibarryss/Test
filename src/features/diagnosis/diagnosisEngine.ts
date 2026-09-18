import { DIAGNOSIS_QUESTIONS, localizedQuestions } from '../../data'
import type { CountryCode, Diagnosis, Field, UserProfile } from '../../lib/types'
import { tValue } from '../../lib/i18n'

export type AnswerMap = Record<string, string>

export function runDiagnosis(
  answers: AnswerMap,
  profile: UserProfile,
  now: Date = new Date()
): Diagnosis {
  const strengths: string[] = []
  const gaps: string[] = []

  const a = (id: string) => answers[id]
  const signal = (key: string) => tValue(`engine.${key}`, '')

  if (a('q-routine') === 'high') strengths.push(signal('sRoutineStrength'))
  if (a('q-routine') === 'low') gaps.push(signal('sRoutineGap'))

  if (a('q-math') === 'strong') strengths.push(signal('sMathStrength'))
  if (a('q-math') === 'weak') gaps.push(signal('sMathGap'))

  if (a('q-english') === 'b2') strengths.push(signal('sEnglishStrength'))
  if (a('q-english') === 'a2') gaps.push(signal('sEnglishGap'))

  if (a('q-exam-ready') === 'yes') strengths.push(signal('sExamYes'))
  if (a('q-exam-ready') === 'planned') gaps.push(signal('sExamPlanned'))
  if (a('q-exam-ready') === 'no') gaps.push(signal('sExamNo'))

  if (a('q-project') === 'yes') strengths.push(signal('sProjectYes'))
  if (a('q-project') === 'no') gaps.push(signal('sProjectNo'))

  if (a('q-mobility') === 'ready') strengths.push(signal('sMobilityReady'))
  if (a('q-mobility') === 'home') gaps.push(signal('sMobilityHome'))

  // ---- recommended field (advisory only) ----------------------------------
  let recommendedField: Field | undefined
  if (a('q-math') === 'strong' && a('q-project') === 'yes') recommendedField = 'cs'
  else if (a('q-math') === 'strong') recommendedField = 'engineering'
  else if (a('q-math') === 'ok') recommendedField = 'business'
  else if (a('q-english') === 'b2') recommendedField = 'humanities'

  // ---- recommended countries (advisory only) ------------------------------
  let recommendedCountries: CountryCode[] | undefined
  if (a('q-mobility') === 'home') recommendedCountries = [profile.citizenship]
  else if (a('q-mobility') === 'ready') recommendedCountries = profile.targetCountries

  return {
    id: 'diag-' + Math.random().toString(36).slice(2, 9),
    completedAt: now.toISOString(),
    answers,
    derived: {
      strengths: strengths.filter(Boolean),
      gaps: gaps.filter(Boolean),
      recommendedField,
      recommendedCountries
    },
    missingProfileFields: missingProfileFields(profile)
  }
}

const REQUIRED_KEYS: { key: keyof UserProfile; label: string }[] = [
  { key: 'grade', label: 'engine.missingGrade' },
  { key: 'graduationYear', label: 'engine.missingGraduationYear' },
  { key: 'citizenship', label: 'engine.missingCitizenship' },
  { key: 'field', label: 'engine.missingField' },
  { key: 'gpa', label: 'engine.missingGpa' }
]

export function missingProfileFields(profile: UserProfile): string[] {
  const missing: string[] = []
  for (const r of REQUIRED_KEYS) {
    const value = profile[r.key]
    if (value === undefined || value === null || value === '') missing.push(tValue(r.label))
  }
  if (!profile.targetCountries || profile.targetCountries.length === 0) {
    missing.push(tValue('engine.missingTargetCountries'))
  }
  if (!profile.budgetUsdPerYear || profile.budgetUsdPerYear <= 0) {
    missing.push(tValue('engine.missingBudget'))
  }
  if (!profile.examScores || Object.keys(profile.examScores).length === 0) {
    missing.push(tValue('engine.missingExamScores'))
  }
  return missing.filter(Boolean)
}

export function profileCompleteness(profile: UserProfile): number {
  const checks = [
    !!profile.grade,
    !!profile.graduationYear,
    !!profile.citizenship,
    profile.targetCountries.length > 0,
    profile.budgetUsdPerYear > 0,
    !!profile.field,
    profile.gpa > 0,
    Object.keys(profile.examScores).length > 0
  ]
  const done = checks.filter(Boolean).length
  return Math.round((done / checks.length) * 100)
}

export function questionsForDiagnosis() {
  return localizedQuestions()
}

export function isDiagnosisComplete(answers: AnswerMap): boolean {
  return DIAGNOSIS_QUESTIONS.every((q) => !!answers[q.id])
}
