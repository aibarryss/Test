import { DIAGNOSIS_QUESTIONS } from '../../data'
import type { CountryCode, Diagnosis, Field, UserProfile } from '../../lib/types'

export type AnswerMap = Record<string, string>

export function runDiagnosis(
  answers: AnswerMap,
  profile: UserProfile,
  now: Date = new Date()
): Diagnosis {
  const strengths: string[] = []
  const gaps: string[] = []

  const a = (id: string) => answers[id]

  if (a('q-routine') === 'high') strengths.push('Consistent weekly study routine')
  if (a('q-routine') === 'low') gaps.push('Study routine depends on deadlines')

  if (a('q-math') === 'strong') strengths.push('Strong quantitative foundation')
  if (a('q-math') === 'weak') gaps.push('Mathematics is a bottleneck — most STEM programs require it')

  if (a('q-english') === 'b2') strengths.push('Ready to study fully in English')
  if (a('q-english') === 'a2') gaps.push('English level below the usual admission threshold')

  if (a('q-exam-ready') === 'yes') strengths.push('A standardised exam score is already in hand')
  if (a('q-exam-ready') === 'planned') gaps.push('Exam date planned but no score yet')
  if (a('q-exam-ready') === 'no') gaps.push('No standardised exam booked yet')

  if (a('q-project') === 'yes') strengths.push('A presentable project or competition result')
  if (a('q-project') === 'no') gaps.push('No portfolio piece to strengthen the application')

  if (a('q-mobility') === 'ready') strengths.push('Clear intent to study abroad')
  if (a('q-mobility') === 'home') gaps.push('Preference to stay in-country narrows the option set')

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
    derived: { strengths, gaps, recommendedField, recommendedCountries },
    missingProfileFields: missingProfileFields(profile)
  }
}

const REQUIRED_LABELS: { key: keyof UserProfile; label: string }[] = [
  { key: 'grade', label: 'Grade' },
  { key: 'graduationYear', label: 'Graduation year' },
  { key: 'citizenship', label: 'Citizenship' },
  { key: 'field', label: 'Target discipline' },
  { key: 'gpa', label: 'GPA' }
]

export function missingProfileFields(profile: UserProfile): string[] {
  const missing: string[] = []
  for (const r of REQUIRED_LABELS) {
    const value = profile[r.key]
    if (value === undefined || value === null || value === '') missing.push(r.label)
  }
  if (!profile.targetCountries || profile.targetCountries.length === 0) missing.push('Target countries')
  if (!profile.budgetUsdPerYear || profile.budgetUsdPerYear <= 0) missing.push('Tuition budget')
  if (!profile.examScores || Object.keys(profile.examScores).length === 0) missing.push('Exam scores')
  return missing
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
  return DIAGNOSIS_QUESTIONS
}

export function isDiagnosisComplete(answers: AnswerMap): boolean {
  return DIAGNOSIS_QUESTIONS.every((q) => !!answers[q.id])
}
