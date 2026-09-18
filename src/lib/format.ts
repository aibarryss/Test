import { getLanguage, t } from './i18n'

export function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return '—'
  const lang = getLanguage()
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US'
  if (value === 0) return t('common').freeGrant
  return '$' + Math.round(value).toLocaleString(locale)
}

export function formatUsdCompact(value: number): string {
  const lang = getLanguage()
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US'
  const suffix = lang === 'ru' ? ' тыс.' : 'k'
  if (value >= 1000) return '$' + Math.round(value / 1000).toLocaleString(locale) + suffix
  return '$' + Math.round(value).toLocaleString(locale)
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(getLanguage() === 'ru' ? 'ru-RU' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
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
