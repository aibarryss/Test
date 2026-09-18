import { describe, expect, it } from 'vitest'
import { computeScore, WEIGHTS } from '../src/features/matching/scoring'
import { PROGRAM_BY_ID, UNIVERSITY_BY_ID } from '../src/data'
import { TEST_PROFILES } from '../src/lib/demoProfile'

const now = new Date('2026-09-16T00:00:00Z')

describe('scoring engine', () => {
  it('keeps the documented weights and sums them to 1', () => {
    const sum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0)
    expect(Math.round(sum * 100) / 100).toBe(1)
    expect(WEIGHTS.budget).toBe(0.25)
    expect(WEIGHTS.field).toBe(0.22)
  })

  it('returns a score between 0 and 100 with a full breakdown', () => {
    const profile = TEST_PROFILES.A
    const program = PROGRAM_BY_ID['nu-cs']
    const uni = UNIVERSITY_BY_ID['nu']
    const res = computeScore(program, uni, profile, now)
    expect(res.score).toBeGreaterThanOrEqual(0)
    expect(res.score).toBeLessThanOrEqual(100)
    expect(res.breakdown).toHaveLength(7)
  })

  it('is deterministic for the same input', () => {
    const a = computeScore(PROGRAM_BY_ID['tum-cs'], UNIVERSITY_BY_ID['tum'], TEST_PROFILES.A, now)
    const b = computeScore(PROGRAM_BY_ID['tum-cs'], UNIVERSITY_BY_ID['tum'], TEST_PROFILES.A, now)
    expect(a.score).toBe(b.score)
  })

  it('prefers an in-country affordable program over a far-away expensive one', () => {
    const profile = TEST_PROFILES.A
    const local = computeScore(PROGRAM_BY_ID['nu-cs'], UNIVERSITY_BY_ID['nu'], profile, now)
    const expensive = computeScore(PROGRAM_BY_ID['uoft-cs'], UNIVERSITY_BY_ID['uoft'], profile, now)
    expect(local.score).toBeGreaterThan(expensive.score)
    // warnings are localized — match both the English and the Russian phrasing
    expect(expensive.warnings.join(' ')).toMatch(/above your budget|превышает ваш бюджет/)
  })

  it('drops confidence when exam and GPA are missing', () => {
    const full = computeScore(PROGRAM_BY_ID['tue-cs'], UNIVERSITY_BY_ID['tue'], TEST_PROFILES.A, now)
    const sparse = computeScore(PROGRAM_BY_ID['tue-cs'], UNIVERSITY_BY_ID['tue'], TEST_PROFILES.D, now)
    expect(sparse.confidence).not.toBe('high')
    expect(full.confidence).toBe('high')
  })
})
