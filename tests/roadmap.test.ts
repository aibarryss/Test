import { describe, expect, it } from 'vitest'
import { buildRoadmap } from '../src/features/roadmap/roadmapEngine'
import { computeNextAction, computeProgress } from '../src/features/progress/progressStore'
import { PROGRAM_BY_ID, PROGRAMS, ROADMAP_TEMPLATES, UNIVERSITY_BY_ID } from '../src/data'
import { recommend } from '../src/features/matching/recommend'
import { TEST_PROFILES } from '../src/lib/demoProfile'
import type { CountryCode } from '../src/lib/types'

const now = new Date('2026-09-16T00:00:00Z')

function build(profile = TEST_PROFILES.A) {
  const recs = recommend(profile, UNIVERSITY_BY_ID, PROGRAMS, now).items
  return buildRoadmap({
    profile,
    recommendations: recs,
    programMap: PROGRAM_BY_ID,
    uniMap: UNIVERSITY_BY_ID,
    templates: ROADMAP_TEMPLATES,
    now
  })
}

describe('roadmap engine', () => {
  it('covers all five phases', () => {
    const roadmap = build()
    const phases = new Set(roadmap.items.map((s) => s.phase))
    expect(phases.has('exams')).toBe(true)
    expect(phases.has('documents')).toBe(true)
    expect(phases.has('deadlines')).toBe(true)
    expect(phases.has('academic')).toBe(true)
    expect(phases.has('activities')).toBe(true)
  })

  it('highlights exactly one next action', () => {
    const roadmap = build()
    const undone = roadmap.items.filter((s) => s.status !== 'done')
    expect(roadmap.nextActionId).toBeTruthy()
    expect(undone.some((s) => s.id === roadmap.nextActionId)).toBe(true)
    expect(computeNextAction(roadmap.items, {})).toBe(roadmap.nextActionId)
  })

  it('moves the next action forward when a step is completed', () => {
    const roadmap = build()
    const first = roadmap.nextActionId
    const statuses = { [first]: 'done' as const }
    const next = computeNextAction(roadmap.items, statuses)
    expect(next).not.toBe(first)
    const progress = computeProgress(roadmap.items, statuses)
    expect(progress.done).toBe(1)
    expect(progress.percent).toBeGreaterThan(0)
  })

  it('adds per-program deadline steps for the shortlist', () => {
    const roadmap = build()
    const deadlineSteps = roadmap.items.filter((s) => s.phase === 'deadlines')
    expect(deadlineSteps.length).toBeGreaterThanOrEqual(roadmap.programIds.length)
    expect(deadlineSteps.every((s) => s.isDemo !== undefined)).toBe(true)
  })

  it('adds a funding step when the shortlist costs more than the budget', () => {
    const profile = {
      ...TEST_PROFILES.A,
      targetCountries: ['US'] as CountryCode[],
      budgetUsdPerYear: 5000,
      needsScholarship: true
    }
    const roadmap = build(profile)
    expect(roadmap.items.some((s) => /scholarship|funding/i.test(s.title))).toBe(true)
  })
})
