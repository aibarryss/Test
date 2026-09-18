export function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return '—'
  if (value === 0) return 'Free / grant'
  return '$' + Math.round(value).toLocaleString('en-US')
}

export function formatUsdCompact(value: number): string {
  if (value >= 1000) return '$' + Math.round(value / 1000) + 'k'
  return '$' + Math.round(value)
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function monthsUntil(iso: string, now: Date = new Date()): number {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return Number.POSITIVE_INFINITY
  return (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
}

export function daysUntil(iso: string, now: Date = new Date()): number {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return Number.POSITIVE_INFINITY
  return Math.round((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function clamp01(v: number): number {
  if (Number.isNaN(v)) return 0
  return Math.max(0, Math.min(1, v))
}

export function percent(v: number): string {
  return Math.round(v * 100) + '%'
}

export function addDays(iso: string, days: number): string {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}
