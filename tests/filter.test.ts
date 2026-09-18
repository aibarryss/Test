import { describe, expect, it } from 'vitest'
import { hardFilter } from '../src/features/matching/filter'
import { buildSuggestions, recommend } from '../src/features/matching/recommend'
import type { Program } from '../src/lib/types'
import { PROGRAMS, UNIVERSITY_BY_ID } from '../src/data'
import { TEST_PROFILES } from '../src/lib/demoProfile'

const now = new Date('2026-09-16T00:00:00Z')

describe('hard filter', () => {
  it('keeps every program for a realistic profile', () => {
    const keptA = hardFilter(PROGRAMS, UNIVERSITY_BY_ID, TEST_PROFILES.A)
    expect(keptA.kept.length).toBe(PROGRAMS.length)
  })

  it('removes a program far above budget with no scholarship path', () => {
    const expensive: Program = {
      ...PROGRAMS[0],
      id: 'synthetic-expensive',
      universityId: 'tum', // TUM has no scholarship path in the dataset
      netTuitionUsdPerYear: 100000
    }
    const tight = { ...TEST_PROFILES.A, budgetUsdPerYear: 2000, needsScholarship: true }
    const res = hardFilter([...PROGRAMS, expensive], UNIVERSITY_BY_ID, tight)
    expect(res.removedByBudget.map((p) => p.id)).toContain('synthetic-expensive')
    expect(res.kept.some((p) => p.id === 'synthetic-expensive')).toBe(false)
  })
})

describe('recommendation pipeline', () => {
  it('returns at least three recommendations for a strong profile', () => {
    const res = recommend(TEST_PROFILES.A, UNIVERSITY_BY_ID, PROGRAMS, now)
    expect(res.items.length).toBeGreaterThanOrEqual(3)
    expect(res.items[0].score).toBeGreaterThanOrEqual(res.items[1].score)
  })

  it('never returns gated programs in the main list', () => {
    const weak = { ...TEST_PROFILES.A, examScores: { IELTS: 5.0 } }
    const res = recommend(weak, UNIVERSITY_BY_ID, PROGRAMS, now)
    expect(res.items.some((i) => i.programId === 'tum-cs')).toBe(false)
  })

  it('produces concrete remedies when the constraints conflict', () => {
    const res = recommend(TEST_PROFILES.E, UNIVERSITY_BY_ID, PROGRAMS, now)
    const suggestions = buildSuggestions(TEST_PROFILES.E, UNIVERSITY_BY_ID, PROGRAMS, now)
    expect(res.items.length).toBeLessThan(3)
    expect(suggestions.length).toBeGreaterThan(0)
    expect(suggestions.map((s) => s.kind)).toContain('budget')
  })

  it('is deterministic', () => {
    const a = recommend(TEST_PROFILES.A, UNIVERSITY_BY_ID, PROGRAMS, now).items.map((i) => i.programId)
    const b = recommend(TEST_PROFILES.A, UNIVERSITY_BY_ID, PROGRAMS, now).items.map((i) => i.programId)
    expect(a).toEqual(b)
  })
})
