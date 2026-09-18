import { useEffect, useMemo, useRef, useState } from 'react'
import type { CountryCode, Field, Recommendation, UserProfile } from '../lib/types'
import { COUNTRY_LABELS, FIELD_LABELS } from '../data'
import { Badge, Button, Card, Chip, EmptyState, FactorBar, Icon, Notice, Skeleton, fitLabel, fitTone } from '../ui/primitives'
import { useApp } from '../state/AppState'
import { explainRecommendations } from '../lib/explain'
import { buildSuggestions } from '../features/matching/recommend'
import { formatUsd } from '../lib/format'
import { t } from '../lib/i18n'

export function RecommendationsScreen({ onCompare, onRoadmap }: { onCompare: () => void; onRoadmap: () => void }) {
  const { state, dispatch, programMap, uniMap, recommendations, canGo } = useApp()
  const profile = state.profile as UserProfile

  const [items, setItems] = useState<Recommendation[]>(recommendations)
  const [origin, setOrigin] = useState<'ai' | 'fallback' | 'mixed'>('fallback')
  const [loading, setLoading] = useState(false)
  const [deltas, setDeltas] = useState<Record<string, { rank: number; score: number; isNew?: boolean }>>({})
  const sigRef = useRef<string | null>(null)
  const snapRef = useRef<Map<string, { rank: number; score: number }> | null>(null)

  const sig = useMemo(
    () =>
      JSON.stringify({
        tc: profile.targetCountries,
        b: profile.budgetUsdPerYear,
        f: profile.field,
        e: profile.examScores,
        g: profile.gpa,
        s: profile.needsScholarship
      }),
    [profile]
  )

  // Delta tracking between profile edits — this is what the jury sees move.
  useEffect(() => {
    const current = new Map<string, { rank: number; score: number }>()
    recommendations.forEach((r, i) => current.set(r.programId, { rank: i + 1, score: r.score }))
    if (snapRef.current && sigRef.current !== sig) {
      const d: Record<string, { rank: number; score: number; isNew?: boolean }> = {}
      current.forEach((v, k) => {
        const prev = snapRef.current!.get(k)
        if (!prev) {
          d[k] = { rank: 0, score: 0, isNew: true }
        } else {
          const rankShift = prev.rank - v.rank
          const scoreShift = Math.round((v.score - prev.score) * 10) / 10
          if (rankShift !== 0 || Math.abs(scoreShift) >= 0.5) d[k] = { rank: rankShift, score: scoreShift }
        }
      })
      setDeltas(d)
    }
    snapRef.current = current
    sigRef.current = sig
  }, [sig, recommendations])

  useEffect(() => {
    let cancelled = false
    setItems(recommendations)
    setOrigin('fallback')
    if (!state.aiEnabled || recommendations.length === 0) return
    setLoading(true)
    explainRecommendations(profile, recommendations, programMap, uniMap, true).then((res) => {
      if (cancelled) return
      setItems(res.items)
      setOrigin(res.origin)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [recommendations, state.aiEnabled, profile, programMap, uniMap])

  const suggestions = useMemo(
    () => (recommendations.length < 3 ? buildSuggestions(profile, uniMap, Object.values(programMap)) : []),
    [recommendations.length, profile, uniMap, programMap]
  )

  const relaxed = useMemo(() => {
    if (recommendations.length >= 3) return []
    const chosen = new Set(recommendations.map((r) => r.programId))
    return Object.values(programMap).filter((p) => !chosen.has(p.id))
  }, [recommendations, programMap])

  const relaxedNotes = relaxed.length > 0 ? relaxed.slice(0, 3).map((p) => p.name) : []
  const rec_t = t('recommendations')

  return (
    <div>
      <div className="hero" style={{ paddingTop: 10, paddingBottom: 6 }}>
        <span className="eyebrow">
          <span className="dot dot-indigo" /> Step 3 · {rec_t.step}
        </span>
        <h1 style={{ fontSize: 30 }}>{rec_t.title}</h1>
        <p className="lead">
          {rec_t.subtitle}
        </p>
      </div>

      <SensitivityPanel profile={profile} dispatch={dispatch} />

      <div className="spread" style={{ margin: '18px 0 8px' }}>
        <div className="section-title" style={{ margin: 0 }}>
          {items.length} {rec_t.recommended} {items.length === 1 ? rec_t.program : rec_t.programs}
        </div>
        <div className="row" style={{ gap: 8 }}>
          {loading ? (
            <Badge tone="ai" dot="dot-indigo">
              {rec_t.askingModel}
            </Badge>
          ) : origin === 'ai' ? (
            <Badge tone="ai">{rec_t.aiExplanation}</Badge>
          ) : origin === 'mixed' ? (
            <Badge tone="ai">{rec_t.aiTemplate}</Badge>
          ) : (
            <Badge tone="neutral">{rec_t.templateExplanation}</Badge>
          )}
        </div>
      </div>

      {items.length < 3 && (
        <div style={{ marginBottom: 12 }}>
          <Notice tone="warn" icon="warning">
            {rec_t.fewerMatches}
          </Notice>
        </div>
      )}

      {items.length === 0 && !loading && (
        <EmptyState
          title={rec_t.noMatch}
          text={rec_t.noMatchText}
        >
          <Button onClick={() => dispatch({ type: 'reset' })}>{rec_t.resetProfile}</Button>
        </EmptyState>
      )}

      <div className="stack">
        {loading && (
          <>
            <Card>
              <Skeleton height={20} width="40%" />
              <div style={{ height: 10 }} />
              <Skeleton height={12} width="70%" />
              <div style={{ height: 16 }} />
              <Skeleton height={10} />
            </Card>
            <Card>
              <Skeleton height={20} width="35%" />
              <div style={{ height: 10 }} />
              <Skeleton height={12} width="65%" />
            </Card>
          </>
        )}

        {!loading &&
          items.map((r) => (
            <RecommendationCard
              key={r.programId}
              rec={r}
              delta={deltas[r.programId]}
              selected={state.selectedProgramIds.includes(r.programId)}
              onToggle={() => dispatch({ type: 'selection/toggle', programId: r.programId })}
            />
          ))}
      </div>

      {suggestions.length > 0 && (
        <Card className="card" >
          <div className="card-head">
            <div>
              <div className="label" style={{ marginBottom: 4 }}>
                How to unlock more options
              </div>
              <div className="card-title">Deterministic remedies</div>
            </div>
            <Badge tone="neutral">derived from data</Badge>
          </div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {suggestions.map((s) => (
              <li key={s.kind} style={{ marginBottom: 7 }}>
                {s.text}
              </li>
            ))}
          </ul>
          {relaxedNotes.length > 0 && (
            <p className="helper" style={{ marginTop: 10 }}>
              Other programs in the dataset you have not unlocked yet: {relaxedNotes.join(', ')}.
            </p>
          )}
        </Card>
      )}

      <StickyBar
        count={state.selectedProgramIds.length}
        onCompare={onCompare}
        onRoadmap={onRoadmap}
        canCompare={state.selectedProgramIds.length >= 2 && canGo('/comparison')}
        canRoadmap={canGo('/roadmap')}
      />
    </div>
  )
}

function RecommendationCard({
  rec,
  delta,
  selected,
  onToggle
}: {
  rec: Recommendation
  delta?: { rank: number; score: number; isNew?: boolean }
  selected: boolean
  onToggle: () => void
}) {
  const { programMap, uniMap } = useApp()
  const program = programMap[rec.programId]
  const uni = uniMap[rec.universityId]
  const [open, setOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  if (!program || !uni) return null
  const topFactors = [...rec.breakdown].filter((f) => f.known).sort((a, b) => b.contribution - a.contribution)
  const factors = showAll ? rec.breakdown : topFactors.slice(0, 3)
  const exp = rec.explanation

  return (
    <Card>
      <div className="card-head">
        <div style={{ minWidth: 0 }}>
          <div className="row" style={{ gap: 8, marginBottom: 4 }}>
            <Badge tone={fitTone(rec.fit)}>{fitLabel(rec.fit)}</Badge>
            <Badge tone="neutral">{rec.score}%</Badge>
            {rec.confidence !== 'high' && <Badge tone="neutral">{rec.confidence} confidence</Badge>}
            {delta && (
              <Badge tone={delta.rank > 0 ? 'fit-high' : delta.rank < 0 ? 'fit-low' : 'neutral'}>
                {delta.isNew ? 'new entry' : `${delta.rank > 0 ? '▲' : delta.rank < 0 ? '▼' : '='} ${Math.abs(delta.rank)} · ${delta.score > 0 ? '+' : ''}${delta.score} pts`}
              </Badge>
            )}
          </div>
          <div className="card-title">{uni.name}</div>
          <div className="card-sub">
            {program.name} · {uni.city}, {COUNTRY_LABELS[uni.country]} · {program.durationYears} yrs · {formatUsd(program.netTuitionUsdPerYear)}/yr
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--primary-container)', letterSpacing: '-0.03em' }}>{Math.round(rec.score)}%</div>
          <div className="helper">fit score</div>
        </div>
      </div>

      {exp && (
        <div className="ai-memo" style={{ marginBottom: 12 }}>
          <div className="spread" style={{ marginBottom: 6 }}>
            <strong style={{ fontSize: 13.5 }}>Why this fits</strong>
            <Badge tone={exp.origin === 'ai' ? 'ai' : 'neutral'}>{exp.origin === 'ai' ? 'AI' : 'template'}</Badge>
          </div>
          <p style={{ fontSize: 13.5 }}>{exp.whyItFits}</p>
          {exp.concerns.length > 0 && (
            <ul style={{ margin: '8px 0 0', paddingLeft: 18, fontSize: 13 }}>
              {exp.concerns.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
          <div className="row" style={{ gap: 6, marginTop: 10, color: 'var(--primary-container)', fontSize: 13 }}>
            <Icon name="bolt" size={16} />
            <span>{exp.nextStepHint}</span>
          </div>
        </div>
      )}

      <div>
        <div className="spread" style={{ marginBottom: 6 }}>
          <span className="label" style={{ margin: 0 }}>
            Fit breakdown
          </span>
          <button className="btn btn-ghost" style={{ padding: '2px 8px', minHeight: 0 }} onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Top 3 only' : 'All factors'}
          </button>
        </div>
        {factors.map((f) => (
          <FactorBar key={f.key} factor={f} />
        ))}
      </div>

      {rec.warnings.length > 0 && (
        <div className="chip-row" style={{ marginTop: 12 }}>
          {rec.warnings.slice(0, 3).map((w) => (
            <Chip key={w} title={w}>
              <Icon name="warning" size={14} /> {w}
            </Chip>
          ))}
        </div>
      )}

      <div className="btn-row" style={{ marginTop: 14 }}>
        <Button variant={selected ? 'primary' : 'secondary'} icon={selected ? 'check' : 'add'} onClick={onToggle}>
          {selected ? 'In comparison' : 'Add to compare'}
        </Button>
        <Button variant="ghost" icon={open ? 'expand_less' : 'expand_more'} onClick={() => setOpen((v) => !v)}>
          {open ? 'Hide details' : 'Details'}
        </Button>
      </div>

      {open && (
        <div className="panel" style={{ marginTop: 12 }}>
          <div className="grid g2">
            <div>
              <div className="label">Requirements</div>
              <div style={{ fontWeight: 600 }}>
                {program.requirements.exams.map((e) => `${e.exam} ${e.minScore}`).join(', ') || 'No exam requirement listed'}
              </div>
              <div className="helper">Min GPA: {program.requirements.minGpa ?? '—'} · Language: {program.requirements.languageLevel ?? '—'}</div>
            </div>
            <div>
              <div className="label">Teaching language</div>
              <div style={{ fontWeight: 600 }}>{program.languagesOfInstruction.join(', ').toUpperCase()}</div>
              <div className="helper">Living cost ≈ {formatUsd(uni.livingCostUsdPerYear ?? 0)}/yr</div>
            </div>
          </div>
          <div className="label" style={{ marginTop: 12 }}>
            Deadlines
          </div>
          {program.deadlines.length === 0 ? (
            <div className="helper">No deadline recorded — confirm on the official page.</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {program.deadlines.map((d) => (
                <li key={d.id}>
                  {d.label} — {d.date} {d.isDemo && <Badge tone="demo">demo data</Badge>}
                </li>
              ))}
            </ul>
          )}
          <div className="row" style={{ gap: 8, marginTop: 10 }}>
            <a className="btn btn-secondary" href={uni.website} target="_blank" rel="noreferrer">
              <Icon name="open_in_new" size={16} /> University site
            </a>
            <Badge tone="neutral">{uni.sourceIds.length} source(s)</Badge>
          </div>
        </div>
      )}
    </Card>
  )
}

function SensitivityPanel({
  profile,
  dispatch
}: {
  profile: UserProfile
  dispatch: React.Dispatch<any>
}) {
  const countries: CountryCode[] = ['KZ', 'DE', 'IT', 'NL', 'UK', 'US', 'CA']
  const fields: Field[] = ['cs', 'engineering', 'business', 'medicine', 'humanities', 'design']

  function patch(p: Partial<UserProfile>) {
    dispatch({ type: 'profile/save', profile: { ...profile, ...p, updatedAt: new Date().toISOString() } })
  }
  function toggleCountry(c: CountryCode) {
    patch({
      targetCountries: profile.targetCountries.includes(c)
        ? profile.targetCountries.filter((x) => x !== c)
        : [...profile.targetCountries, c]
    })
  }

  return (
    <Card>
      <div className="spread" style={{ marginBottom: 8 }}>
        <div className="row" style={{ gap: 8 }}>
          <Icon name="tune" size={18} />
          <strong>Live sensitivity</strong>
        </div>
        <Badge tone="neutral">change a parameter → shortlist moves</Badge>
      </div>
      <div className="grid g2">
        <div>
          <div className="label">Destinations</div>
          <div className="chip-row">
            {countries.map((c) => (
              <Chip key={c} on={profile.targetCountries.includes(c)} onClick={() => toggleCountry(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <div className="label">Tuition budget</div>
          <div className="chip-row">
            {[0, 3000, 6000, 15000, 30000, 45000].map((v) => (
              <Chip key={v} on={profile.budgetUsdPerYear === v} onClick={() => patch({ budgetUsdPerYear: v })}>
                {v === 0 ? 'Grant' : '$' + (v / 1000) + 'k'}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <div className="label">Discipline</div>
          <div className="chip-row">
            {fields.map((f) => (
              <Chip key={f} on={profile.field === f} onClick={() => patch({ field: f })}>
                {FIELD_LABELS[f]}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <div className="label">IELTS</div>
          <div className="chip-row">
            {[5.0, 5.5, 6.0, 6.5, 7.0].map((v) => (
              <Chip key={v} on={profile.examScores.IELTS === v} onClick={() => patch({ examScores: { ...profile.examScores, IELTS: v } })}>
                {v.toFixed(1)}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

function StickyBar({
  count,
  onCompare,
  onRoadmap,
  canCompare,
  canRoadmap
}: {
  count: number
  onCompare: () => void
  onRoadmap: () => void
  canCompare: boolean
  canRoadmap: boolean
}) {
  return (
    <div className="card" style={{ marginTop: 16, position: 'sticky', bottom: 76, zIndex: 20 }}>
      <div className="spread">
        <div>
          <div style={{ fontWeight: 700 }}>
            {count === 0 ? 'Select programs to compare' : `${count} selected`}
          </div>
          <div className="helper">
            {count >= 2 ? 'Ready to compare side by side.' : 'Pick at least two programs.'}
          </div>
        </div>
        <div className="btn-row">
          <Button variant="secondary" icon="balance" onClick={onCompare} disabled={!canCompare}>
            Compare {count >= 2 ? `(${count})` : ''}
          </Button>
          <Button icon="route" onClick={onRoadmap} disabled={!canRoadmap}>
            Roadmap
          </Button>
        </div>
      </div>
    </div>
  )
}
