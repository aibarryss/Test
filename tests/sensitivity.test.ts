import { describe, expect, it } from 'vitest'
import { recommend } from '../src/features/matching/recommend'
import { PROGRAMS, UNIVERSITY_BY_ID } from '../src/data'
import { TEST_PROFILES } from '../src/lib/demoProfile'

const now = new Date('2026-09-16T00:00:00Z')

const run = (profile: Parameters<typeof recommend>[0]) => recommend(profile, UNIVERSITY_BY_ID, PROGRAMS, now)

function signature(items: { programId: string; score: number }[]): string {
  return items.map((i) => `${i.programId}:${i.score}`).join('|')
}

describe('profile sensitivity — changing a parameter must move the result', () => {
  it('changing destinations changes the shortlist', () => {
    const base = run(TEST_PROFILES.A)
    const changed = run({ ...TEST_PROFILES.A, targetCountries: ['US', 'CA'] })
    expect(signature(changed.items)).not.toBe(signature(base.items))
  })

  it('changing the budget changes the shortlist', () => {
    const base = run(TEST_PROFILES.A)
    const rich = run({ ...TEST_PROFILES.A, budgetUsdPerYear: 30000 })
    expect(signature(rich.items)).not.toBe(signature(base.items))
  })

  it('changing the discipline changes the shortlist', () => {
    const base = run(TEST_PROFILES.A)
    const business = run({ ...TEST_PROFILES.A, field: 'business' })
    expect(signature(business.items)).not.toBe(signature(base.items))
  })

  it('a failed exam removes the program from the main list', () => {
    const base = run(TEST_PROFILES.A)
    const weak = run({ ...TEST_PROFILES.A, examScores: { IELTS: 5.0 } })
    expect(base.items.some((i) => i.programId === 'tum-cs')).toBe(true)
    expect(weak.items.some((i) => i.programId === 'tum-cs')).toBe(false)
  })

  it('handles a data-poor profile without crashing', () => {
    const res = run(TEST_PROFILES.D)
    expect(Array.isArray(res.items)).toBe(true)
    expect(res.notes.length).toBeGreaterThan(0)
  })

  it('handles a conflicting profile without crashing', () => {
    const res = run(TEST_PROFILES.E)
    expect(Array.isArray(res.items)).toBe(true)
    expect(res.totalEvaluated).toBeGreaterThan(0)
  })

  it('marks low confidence when exam data is missing', () => {
    const res = run({ ...TEST_PROFILES.A, examScores: {} })
    const anyNotHigh = res.items.some((i) => i.confidence !== 'high')
    expect(anyNotHigh).toBe(true)
  })
})
