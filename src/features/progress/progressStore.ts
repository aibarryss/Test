import type { RoadmapStep, StepStatus } from '../../lib/types'

export type StatusMap = Record<string, StepStatus>

export function computeProgress(
  items: RoadmapStep[],
  statuses: StatusMap
): { done: number; total: number; percent: number } {
  const total = items.length
  const done = items.filter((s) => (statuses[s.id] ?? s.status) === 'done').length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)
  return { done, total, percent }
}

/** The single highlighted next action: first undone step by (priority, dueDate). */
export function computeNextAction(items: RoadmapStep[], statuses: StatusMap): string {
  const open = items.filter((s) => (statuses[s.id] ?? s.status) !== 'done')
  if (open.length === 0) return ''
  const sorted = [...open].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority
    const da = a.dueDate ? new Date(a.dueDate).getTime() : Number.POSITIVE_INFINITY
    const db = b.dueDate ? new Date(b.dueDate).getTime() : Number.POSITIVE_INFINITY
    if (da !== db) return da - db
    return a.id.localeCompare(b.id)
  })
  return sorted[0].id
}
