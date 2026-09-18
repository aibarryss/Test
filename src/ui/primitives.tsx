import React from 'react'
import type { Fit, ScoreFactor } from '../lib/types'
import { t } from '../lib/i18n'

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size }}>
      {name}
    </span>
  )
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  block?: boolean
  icon?: string
}

export function Button({
  variant = 'primary',
  block,
  icon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const cls = ['btn', `btn-${variant}`, block ? 'btn-block' : '', className].filter(Boolean).join(' ')
  return (
    <button className={cls} {...rest}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  )
}

export function Card({
  children,
  className = '',
  interactive,
  onClick
}: {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  onClick?: () => void
}) {
  return (
    <div className={['card', interactive ? 'card-interactive' : '', className].filter(Boolean).join(' ')} onClick={onClick}>
      {children}
    </div>
  )
}

export function Badge({
  children,
  tone = 'neutral',
  dot
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'primary' | 'ai' | 'demo' | 'fit-high' | 'fit-medium' | 'fit-low'
  dot?: string
}) {
  const cls = `badge badge-${tone}`
  return (
    <span className={cls}>
      {dot && <span className={`dot ${dot}`} />}
      {children}
    </span>
  )
}

export function fitTone(fit: Fit): 'fit-high' | 'fit-medium' | 'fit-low' {
  return fit === 'high' ? 'fit-high' : fit === 'medium' ? 'fit-medium' : 'fit-low'
}

export function fitLabel(fit: Fit): string {
  const rec = t('recommendations')
  return fit === 'high' ? rec.strongFit : fit === 'medium' ? rec.moderateFit : rec.stretch
}

export function Chip({
  children,
  on,
  onClick,
  title
}: {
  children: React.ReactNode
  on?: boolean
  onClick?: () => void
  title?: string
}) {
  const clickable = typeof onClick === 'function'
  return (
    <span
      className={['chip', clickable ? 'chip-toggle' : '', on ? 'on' : ''].filter(Boolean).join(' ')}
      onClick={onClick}
      title={title}
      role={clickable ? 'button' : undefined}
    >
      {children}
    </span>
  )
}

export function ProgressBar({ percent, tone = 'default' }: { percent: number; tone?: 'default' | 'emerald' }) {
  return (
    <div className="progress-track">
      <div
        className={['progress-fill', tone === 'emerald' ? 'emerald' : ''].filter(Boolean).join(' ')}
        style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
      />
    </div>
  )
}

export function FactorBar({ factor }: { factor: ScoreFactor }) {
  const pct = Math.round(factor.normalized * 100)
  const tone = !factor.known ? '' : pct >= 80 ? 'emerald' : pct >= 55 ? '' : 'ochre'
  return (
    <div className={['factor', factor.known ? '' : 'unknown'].filter(Boolean).join(' ')}>
      <span className="factor-label">
        {factor.label}
        {!factor.known && <span className="helper" style={{ marginLeft: 6 }}>·{t('common').noData}</span>}
      </span>
      <span className="factor-track">
        <span className={['factor-fill', tone].filter(Boolean).join(' ')} style={{ width: `${pct}%` }} />
      </span>
      <span className="factor-value">{pct}%</span>
    </div>
  )
}

export function Skeleton({ height = 16, width = '100%', style }: { height?: number; width?: string; style?: React.CSSProperties }) {
  return <div className="skeleton" style={{ height, width, ...style }} />
}

export function EmptyState({
  title,
  text,
  children
}: {
  title: string
  text: string
  children?: React.ReactNode
}) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{text}</p>
      {children && <div style={{ marginTop: 16 }}>{children}</div>}
    </div>
  )
}

export function Notice({
  tone = 'info',
  icon,
  children
}: {
  tone?: 'info' | 'warn' | 'error'
  icon?: string
  children: React.ReactNode
}) {
  return (
    <div className={`notice notice-${tone}`}>
      {icon && <Icon name={icon} size={18} />}
      <div>{children}</div>
    </div>
  )
}

export function Field({
  label,
  helper,
  error,
  children
}: {
  label: string
  helper?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className={['field', error ? 'invalid' : ''].filter(Boolean).join(' ')}>
      <span className="label">{label}</span>
      {children}
      {error ? <span className="error-text">{error}</span> : helper ? <span className="helper">{helper}</span> : null}
    </label>
  )
}
