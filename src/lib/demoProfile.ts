import type { UserProfile } from './types'

function base(overrides: Partial<UserProfile> = {}): UserProfile {
  const now = new Date().toISOString()
  return {
    id: 'p-' + Math.random().toString(36).slice(2, 8),
    name: 'Aliya',
    grade: 11,
    graduationYear: 2027,
    citizenship: 'KZ',
    targetCountries: ['KZ', 'DE'],
    budgetUsdPerYear: 6000,
    needsScholarship: true,
    field: 'cs',
    examScores: { IELTS: 6.0 },
    gpa: 4.3,
    englishLevel: 'B2',
    createdAt: now,
    updatedAt: now,
    ...overrides
  }
}

/** The demo profile used by the "Try a demo dossier" button. */
export function demoProfile(): UserProfile {
  return base()
}

/** Answers used by the demo dossier so it lands on a fully populated diagnosis. */
export const DEMO_ANSWERS: Record<string, string> = {
  'q-routine': 'high',
  'q-math': 'strong',
  'q-english': 'b2',
  'q-exam-ready': 'planned',
  'q-project': 'yes',
  'q-mobility': 'ready'
}

/** Test fixtures — profiles A, B, C, D (missing data), E (conflicting). */
export const TEST_PROFILES = {
  A: base({ name: 'Profile A' }),
  B: base({
    name: 'Profile B',
    citizenship: 'US',
    targetCountries: ['US'],
    budgetUsdPerYear: 45000,
    field: 'business',
    examScores: { IELTS: 7.0, SAT: 1400 },
    gpa: 4.6
  }),
  C: base({
    name: 'Profile C',
    citizenship: 'UK',
    targetCountries: ['UK'],
    budgetUsdPerYear: 30000,
    field: 'humanities',
    examScores: { IELTS: 6.5 },
    gpa: 4.4
  }),
  D: base({
    name: 'Profile D',
    targetCountries: ['NL'],
    budgetUsdPerYear: 0,
    field: 'cs',
    examScores: {},
    gpa: 0
  }),
  E: base({
    name: 'Profile E',
    citizenship: 'KZ',
    targetCountries: ['US'],
    budgetUsdPerYear: 1000,
    field: 'medicine',
    examScores: {},
    gpa: 3.0
  })
} as const
