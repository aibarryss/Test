import type { Program, University, UserProfile } from '../../lib/types'

export interface FilterOutcome {
  kept: Program[]
  removedByBudget: Program[]
}

/**
 * A program is dropped outright only when its net cost exceeds the budget by
 * this factor *and* there is no scholarship path at all. Below that threshold,
 * cost stays a weighted scoring factor (0.25) — this keeps the shortlist from
 * emptying out and lets an expensive option still surface as a "stretch".
 */
export const BUDGET_BLOWOUT_MULTIPLIER = 3

/**
 * Hard filters remove only what is clearly impossible: a program whose net cost
 * is more than 3x the budget with no scholarship path at all.
 *
 * Country and subject are intentionally NOT hard filters — they are weighted
 * factors, so changing them re-orders the shortlist instead of emptying it.
 * Teaching language is also handled as a soft factor (low language score plus a
 * warning) rather than a removal, so the student can still see the trade-off.
 */
export function hardFilter(
  programs: Program[],
  uniMap: Record<string, University>,
  profile: UserProfile
): FilterOutcome {
  const kept: Program[] = []
  const removedByBudget: Program[] = []

  for (const p of programs) {
    const u = uniMap[p.universityId]
    if (!u) continue

    const budgetBlowout =
      p.netTuitionUsdPerYear > profile.budgetUsdPerYear * BUDGET_BLOWOUT_MULTIPLIER &&
      !u.scholarshipAvailable
    if (budgetBlowout) {
      removedByBudget.push(p)
      continue
    }

    kept.push(p)
  }

  return { kept, removedByBudget }
}
