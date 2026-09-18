import { Icon } from './primitives'

export const NAV = [
  { path: '/profile', label: 'Profile', short: 'Profile', num: 1 },
  { path: '/diagnosis', label: 'Diagnosis', short: 'Diagnose', num: 2 },
  { path: '/recommendations', label: 'Recommendations', short: 'Matches', num: 3 },
  { path: '/comparison', label: 'Compare', short: 'Compare', num: 4 },
  { path: '/roadmap', label: 'Roadmap', short: 'Roadmap', num: 5 }
]

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 160 44" height={size} width={(size / 44) * 160} fill="none" aria-label="Pathly">
      <rect x="2" y="6" width="32" height="32" rx="10" fill="#4338CA" />
      <path d="M12 24C14 18 18 14 24 14C24 18 20 22 14 24Z" fill="#A5B4FC" />
      <circle cx="23" cy="19" r="3.5" fill="#34D399" />
      <path d="M14 26C18 25 22 27 24 30" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <text x="44" y="28" fontFamily="Plus Jakarta Sans, Inter, sans-serif" fontSize="22" fontWeight="800" fill="#1E1B4B" letterSpacing="-0.5">
        Pathly
      </text>
    </svg>
  )
}

export function TopBar({
  path,
  onNavigate,
  canGo,
  readiness,
  aiEnabled,
  onToggleAI
}: {
  path: string
  onNavigate: (p: string) => void
  canGo: (p: string) => boolean
  readiness: number
  aiEnabled: boolean
  onToggleAI: (v: boolean) => void
}) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" onClick={() => onNavigate('/')} title="Home">
          <Logo />
          <span className="brand-text">
            <span className="brand-name">Pathly</span>
            <span className="brand-sub">Admissions Dossier</span>
          </span>
        </button>

        <nav className="nav-steps">
          {NAV.map((n) => (
            <button
              key={n.path}
              className={['nav-step', path === n.path ? 'active' : ''].filter(Boolean).join(' ')}
              onClick={() => canGo(n.path) && onNavigate(n.path)}
              disabled={!canGo(n.path)}
              style={!canGo(n.path) ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
            >
              {n.num}. {n.label}
            </button>
          ))}
        </nav>

        <div className="topbar-right">
          <span className="readiness" title="Profile completeness and roadmap progress">
            <span className="pulse" />
            {readiness}% readiness
          </span>
          <label className="toggle" title="AI explanations can be turned off — the deterministic fallback always works">
            <input type="checkbox" checked={aiEnabled} onChange={(e) => onToggleAI(e.target.checked)} />
            AI
          </label>
          <span className="avatar">A</span>
        </div>
      </div>
    </header>
  )
}

export function BottomNav({
  path,
  onNavigate,
  canGo
}: {
  path: string
  onNavigate: (p: string) => void
  canGo: (p: string) => boolean
}) {
  const icons: Record<string, string> = {
    '/profile': 'badge',
    '/diagnosis': 'neurology',
    '/recommendations': 'school',
    '/comparison': 'balance',
    '/roadmap': 'route'
  }
  return (
    <nav className="bottom-nav">
      <button className={path === '/' ? 'active' : ''} onClick={() => onNavigate('/')}>
        <Icon name="home" size={20} />
        Home
      </button>
      {NAV.map((n) => (
        <button
          key={n.path}
          className={path === n.path ? 'active' : ''}
          onClick={() => canGo(n.path) && onNavigate(n.path)}
          disabled={!canGo(n.path)}
        >
          <Icon name={icons[n.path]} size={20} />
          {n.short}
        </button>
      ))}
    </nav>
  )
}
