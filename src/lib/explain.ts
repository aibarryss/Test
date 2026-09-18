import type {
  Program,
  Recommendation,
  RecommendationExplanation,
  University,
  UserProfile
} from './types'
import { fallbackExplanation } from './explainFallback'

const AI_TIMEOUT_MS = 5000

export interface ExplainResult {
  items: Recommendation[]
  origin: 'ai' | 'fallback' | 'mixed'
}

function attachFallback(
  recs: Recommendation[],
  programMap: Record<string, Program>,
  uniMap: Record<string, University>
): Recommendation[] {
  return recs.map((r) => ({
    ...r,
    explanation: r.explanation ?? fallbackExplanation(r, programMap[r.programId], uniMap[r.universityId])
  }))
}

/**
 * AI layer. The model is only allowed to rephrase facts that the deterministic
 * engine already produced: it receives the score breakdown and must return text
 * keyed by programId. Any failure — offline, 404, timeout, bad JSON, unknown
 * programId — silently falls back to the template explanation.
 */
export async function explainRecommendations(
  profile: UserProfile,
  recs: Recommendation[],
  programMap: Record<string, Program>,
  uniMap: Record<string, University>,
  enabled: boolean
): Promise<ExplainResult> {
  const withFallback = attachFallback(recs, programMap, uniMap)
  if (!enabled || recs.length === 0) {
    return { items: withFallback, origin: 'fallback' }
  }

  try {
    const payload = {
      profile: {
        grade: profile.grade,
        field: profile.field,
        targetCountries: profile.targetCountries,
        budgetUsdPerYear: profile.budgetUsdPerYear,
        examScores: profile.examScores,
        gpa: profile.gpa
      },
      recommendations: recs.map((r) => {
        const p = programMap[r.programId]
        const u = uniMap[r.universityId]
        return {
          programId: r.programId,
          universityName: u?.name ?? '',
          programName: p?.name ?? '',
          netTuitionUsdPerYear: p?.netTuitionUsdPerYear ?? 0,
          score: r.score,
          fit: r.fit,
          warnings: r.warnings,
          breakdown: r.breakdown.map((f) => ({
            key: f.key,
            label: f.label,
            normalized: Number(f.normalized.toFixed(2)),
            weight: f.weight
          }))
        }
      })
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS)
    const res = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    })
    clearTimeout(timer)
    if (!res.ok) throw new Error('AI endpoint returned ' + res.status)

    const data = (await res.json()) as { items?: unknown }
    const raw = Array.isArray(data.items) ? (data.items as Record<string, unknown>[]) : []
    const allowed = new Set(recs.map((r) => r.programId))
    const byId = new Map<string, Record<string, unknown>>()
    for (const item of raw) {
      const pid = String(item.programId ?? '')
      if (allowed.has(pid)) byId.set(pid, item)
    }
    if (byId.size === 0) throw new Error('No valid AI items')

    let aiCount = 0
    const merged = withFallback.map((r) => {
      const ai = byId.get(r.programId)
      if (!ai || typeof ai.whyItFits !== 'string' || ai.whyItFits.trim() === '') return r
      aiCount++
      const explanation: RecommendationExplanation = {
        whyItFits: String(ai.whyItFits).slice(0, 400),
        concerns: Array.isArray(ai.concerns)
          ? (ai.concerns as unknown[]).map((c) => String(c)).slice(0, 3)
          : r.explanation!.concerns,
        nextStepHint:
          typeof ai.nextStepHint === 'string' && ai.nextStepHint.trim()
            ? String(ai.nextStepHint).slice(0, 200)
            : r.explanation!.nextStepHint,
        origin: 'ai'
      }
      return { ...r, explanation }
    })

    const origin: ExplainResult['origin'] = aiCount === recs.length ? 'ai' : aiCount === 0 ? 'fallback' : 'mixed'
    return { items: merged, origin }
  } catch {
    return { items: withFallback, origin: 'fallback' }
  }
}

export { fallbackExplanation }
