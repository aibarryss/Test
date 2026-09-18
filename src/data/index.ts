import type {
  CountryCode,
  DiagnosisQuestion,
  Program,
  RoadmapTemplate,
  Source,
  University,
  UserProfile
} from '../lib/types'

import universitiesRaw from './universities.json'
import programsRaw from './programs.json'
import sourcesRaw from './sources.json'
import questionsRaw from './diagnosis-questions.json'
import templatesRaw from './roadmap-templates.json'

export const UNIVERSITIES = universitiesRaw as unknown as University[]
export const PROGRAMS = programsRaw as unknown as Program[]
export const SOURCES = sourcesRaw as unknown as Source[]
export const DIAGNOSIS_QUESTIONS = questionsRaw as unknown as DiagnosisQuestion[]
export const ROADMAP_TEMPLATES = templatesRaw as unknown as RoadmapTemplate[]

export const UNIVERSITY_BY_ID: Record<string, University> = Object.fromEntries(
  UNIVERSITIES.map((u) => [u.id, u])
)

export const PROGRAM_BY_ID: Record<string, Program> = Object.fromEntries(
  PROGRAMS.map((p) => [p.id, p])
)

export const SOURCE_BY_ID: Record<string, Source> = Object.fromEntries(
  SOURCES.map((s) => [s.id, s])
)

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  KZ: 'Kazakhstan',
  RU: 'Russia',
  US: 'United States',
  UK: 'United Kingdom',
  DE: 'Germany',
  IT: 'Italy',
  CA: 'Canada',
  TR: 'Turkey',
  KR: 'South Korea',
  NL: 'Netherlands'
}

export const FIELD_LABELS = {
  cs: 'Computer Science',
  engineering: 'Engineering',
  business: 'Business & Economics',
  medicine: 'Life Sciences & Medicine',
  humanities: 'Humanities',
  design: 'Design'
} as const

export function countriesOfPrograms(list: Program[] = PROGRAMS): CountryCode[] {
  const set = new Set<CountryCode>()
  list.forEach((p) => {
    const u = UNIVERSITY_BY_ID[p.universityId]
    if (u) set.add(u.country)
  })
  return Array.from(set)
}

export type { UserProfile }
