// ---------------------------------------------------------------------------
// Pathly — single source of truth for data contracts (team A + team B).
// Everything else in the app depends on these types only.
// ---------------------------------------------------------------------------

export type CountryCode = 'KZ' | 'RU' | 'US' | 'UK' | 'DE' | 'IT' | 'CA' | 'TR' | 'KR' | 'NL'
export type Field = 'cs' | 'engineering' | 'business' | 'medicine' | 'humanities' | 'design'
export type ExamId = 'IELTS' | 'TOEFL' | 'SAT' | 'ENT' | 'DUOLINGO'
export type Fit = 'high' | 'medium' | 'low'
export type Confidence = 'high' | 'medium' | 'low'
export type StepPhase = 'exams' | 'documents' | 'deadlines' | 'academic' | 'activities'
export type StepStatus = 'todo' | 'in_progress' | 'done'
export type EnglishLevel = 'A2' | 'B1' | 'B2' | 'C1'

export interface UserProfile {
  id: string
  name?: string
  grade: 9 | 10 | 11
  graduationYear: number
  citizenship: CountryCode
  targetCountries: CountryCode[]
  budgetUsdPerYear: number
  needsScholarship: boolean
  field: Field
  examScores: Partial<Record<ExamId, number>>
  gpa: number
  englishLevel?: EnglishLevel
  createdAt: string
  updatedAt: string
}

export interface University {
  id: string
  name: string
  country: CountryCode
  city: string
  type: 'public' | 'private'
  website: string
  rankingTier?: 1 | 2 | 3
  livingCostUsdPerYear?: number
  scholarshipAvailable: boolean
  scholarshipNote?: string
  languagesOfInstruction: string[]
  sourceIds: string[]
}

export interface Requirements {
  exams: { exam: ExamId; minScore: number }[]
  minGpa?: number
  languageLevel?: string
}

export interface Deadline {
  id: string
  kind: 'application' | 'documents' | 'exam' | 'scholarship' | 'visa'
  date: string
  label: string
  programId?: string
  sourceId?: string
  isDemo: boolean
}

export interface Program {
  id: string
  universityId: string
  name: string
  field: Field
  degree: 'bachelor'
  durationYears: number
  netTuitionUsdPerYear: number
  languagesOfInstruction: string[]
  requirements: Requirements
  deadlines: Deadline[]
  sourceIds: string[]
}

export interface Source {
  id: string
  title: string
  url: string
  kind: 'official' | 'demo'
  note?: string
  accessedAt?: string
}

export type ScoreFactorKey =
  | 'budget'
  | 'field'
  | 'country'
  | 'academic'
  | 'language'
  | 'deadline'
  | 'scholarship'

export interface ScoreFactor {
  key: ScoreFactorKey
  label: string
  weight: number
  effectiveWeight: number
  normalized: number
  contribution: number
  known: boolean
}

export interface RecommendationExplanation {
  whyItFits: string
  concerns: string[]
  nextStepHint: string
  origin: 'ai' | 'fallback'
}

export interface Recommendation {
  programId: string
  universityId: string
  score: number
  fit: Fit
  confidence: Confidence
  breakdown: ScoreFactor[]
  warnings: string[]
  sourceIds: string[]
  explanation?: RecommendationExplanation
}

export interface Diagnosis {
  id: string
  completedAt: string
  answers: Record<string, string | number | boolean>
  derived: {
    strengths: string[]
    gaps: string[]
    recommendedField?: Field
    recommendedCountries?: CountryCode[]
  }
  missingProfileFields: string[]
}

export interface RoadmapStep {
  id: string
  phase: StepPhase
  title: string
  description: string
  dueDate?: string
  status: StepStatus
  priority: 1 | 2 | 3
  dependsOn?: string[]
  linkedProgramId?: string
  sourceIds: string[]
  isDemo?: boolean
}

export interface Roadmap {
  id: string
  profileId: string
  programIds: string[]
  createdAt: string
  items: RoadmapStep[]
  nextActionId: string
}

export interface DiagnosisQuestion {
  id: string
  prompt: string
  helper?: string
  options: { value: string; label: string }[]
}

export interface RoadmapTemplate {
  phase: StepPhase
  title: string
  description: string
  priority: 1 | 2 | 3
  trigger?: 'always' | 'gap' | 'scholarship' | 'gradeYear'
}

export interface MatchResult {
  items: Recommendation[]
  relaxed: Recommendation[]
  notes: string[]
  totalEvaluated: number
}
