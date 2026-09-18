import { useMemo } from 'react'
import type { RoadmapStep, StepPhase, StepStatus } from '../lib/types'
import { Badge, Button, Card, EmptyState, Icon, Notice, ProgressBar } from '../ui/primitives'
import { useApp } from '../state/AppState'
import { SOURCE_BY_ID } from '../data'
import { formatDate } from '../lib/format'
import { t } from '../lib/i18n'

const PHASE_ICONS: Record<StepPhase, string> = {
  exams: 'quiz',
  documents: 'description',
  deadlines: 'event',
  academic: 'school',
  activities: 'emoji_events'
}

export function RoadmapScreen({ onBack, onRecommendations }: { onBack: () => void; onRecommendations: () => void }) {
  const { state, dispatch, roadmap, progress, nextAction } = useApp()
  const r = t('roadmap')

  const grouped = useMemo(() => {
    const map = new Map<StepPhase, RoadmapStep[]>()
    roadmap?.items.forEach((s) => {
      if (!map.has(s.phase)) map.set(s.phase, [])
      map.get(s.phase)!.push(s)
    })
    return Array.from(map.entries())
  }, [roadmap])

  if (!roadmap) {
    return (
      <div className="lane">
        <div className="hero" style={{ paddingTop: 10, paddingBottom: 6 }}>
          <span className="eyebrow">
            <span className="dot dot-indigo" /> {r.step}
          </span>
          <h1 style={{ fontSize: 28 }}>{r.title}</h1>
        </div>
        <EmptyState title={r.noRoadmapTitle} text={r.noRoadmapText}>
          <Button onClick={onRecommendations}>{r.getRecommendations}</Button>
        </EmptyState>
      </div>
    )
  }

  const nextStep = roadmap.items.find((s) => s.id === nextAction)

  function cycle(step: RoadmapStep) {
    const cur = state.statuses[step.id] ?? step.status
    const order: StepStatus[] = ['todo', 'in_progress', 'done']
    const idx = order.indexOf(cur)
    const next = order[(idx + 1) % order.length]
    dispatch({ type: 'status/set', id: step.id, status: next })
  }

  return (
    <div>
      <div className="hero" style={{ paddingTop: 10, paddingBottom: 6 }}>
        <span className="eyebrow">
          <span className="dot dot-indigo" /> {r.step}
        </span>
        <h1 style={{ fontSize: 30 }}>{r.title}</h1>
        <p className="lead">{r.subtitle}</p>
      </div>

      <div className="metrics" style={{ marginBottom: 14 }}>
        <div className="metric">
          <div className="v">{progress.percent}%</div>
          <div className="l">{r.roadmapComplete}</div>
        </div>
        <div className="metric">
          <div className="v">
            {progress.done}/{progress.total}
          </div>
          <div className="l">{r.stepsDone}</div>
        </div>
        <div className="metric">
          <div className="v">{roadmap.programIds.length}</div>
          <div className="l">{r.programsInPlan}</div>
        </div>
        <div className="metric">
          <div className="v">{roadmap.items.filter((s) => s.phase === 'deadlines').length}</div>
          <div className="l">{r.deadlineSteps}</div>
        </div>
      </div>

      {nextStep && (
        <div className="next-action" style={{ marginBottom: 16 }}>
          <div className="spread" style={{ marginBottom: 8 }}>
            <span className="kicker">{r.nextAction}</span>
            <Badge tone="primary">{r.priority} {nextStep.priority}</Badge>
          </div>
          <h3 style={{ fontSize: 19, marginBottom: 6 }}>{nextStep.title}</h3>
          <p className="card-sub" style={{ marginBottom: 12 }}>
            {nextStep.description}
          </p>
          <div className="row" style={{ gap: 8, marginBottom: 12 }}>
            <Badge tone="neutral">{r.phases[nextStep.phase]}</Badge>
            {nextStep.dueDate && <Badge tone="demo">{r.due} {formatDate(nextStep.dueDate)}</Badge>}
            {nextStep.isDemo && <Badge tone="demo">{r.demoDate}</Badge>}
          </div>
          <div className="btn-row">
            <Button icon="check" onClick={() => dispatch({ type: 'status/set', id: nextStep.id, status: 'done' })}>
              {r.markAsDone}
            </Button>
            <Button variant="secondary" icon="play_arrow" onClick={() => dispatch({ type: 'status/set', id: nextStep.id, status: 'in_progress' })}>
              {r.inProgress}
            </Button>
          </div>
        </div>
      )}

      <div className="spread" style={{ marginBottom: 4 }}>
        <div className="section-title" style={{ margin: 0 }}>
          {r.admissionPhases}
        </div>
        <span className="stamp">{r.cycleHint}</span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <ProgressBar percent={progress.percent} tone="emerald" />
      </div>

      <div className="stack">
        {grouped.map(([phase, steps]) => (
          <Card key={phase}>
            <div className="card-head">
              <div className="row" style={{ gap: 8 }}>
                <Icon name={PHASE_ICONS[phase]} size={18} />
                <span className="card-title">{r.phases[phase]}</span>
              </div>
              <Badge tone="neutral">
                {steps.filter((s) => (state.statuses[s.id] ?? s.status) === 'done').length}/{steps.length}
              </Badge>
            </div>

            <div className="timeline">
              {steps.map((s) => {
                const status = state.statuses[s.id] ?? s.status
                return (
                  <div key={s.id} className={['tl-item', status === 'done' ? 'done' : ''].filter(Boolean).join(' ')}>
                    <div
                      className={['tl-node', status === 'done' ? 'done' : '', status === 'in_progress' ? 'active' : ''].filter(Boolean).join(' ')}
                      onClick={() => cycle(s)}
                      role="button"
                      title={r.cycleTitle}
                    >
                      {status === 'done' ? <Icon name="check" size={16} /> : status === 'in_progress' ? '•' : ''}
                    </div>
                    <div className="tl-body">
                      <div className="tl-title">{s.title}</div>
                      <div className="tl-desc">{s.description}</div>
                      <div className="tl-meta">
                        <Badge tone={status === 'done' ? 'fit-high' : status === 'in_progress' ? 'primary' : 'neutral'}>
                          {status === 'done' ? r.done : status === 'in_progress' ? r.inProgress : r.todo}
                        </Badge>
                        {s.dueDate && <Badge tone="demo">{r.due} {formatDate(s.dueDate)}</Badge>}
                        {s.isDemo && <Badge tone="demo">{r.demoData}</Badge>}
                        {s.sourceIds[0] && SOURCE_BY_ID[s.sourceIds[0]] && (
                          <a href={SOURCE_BY_ID[s.sourceIds[0]].url} target="_blank" rel="noreferrer" className="helper">
                            {r.source}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 14 }}>
        <Notice tone="warn" icon="info">
          {r.warningDemo}
        </Notice>
      </div>

      <div className="btn-row" style={{ marginTop: 16 }}>
        <Button variant="secondary" icon="arrow_back" onClick={onBack}>
          {r.backToComparison}
        </Button>
        <Button variant="secondary" icon="print" onClick={() => window.print()}>
          {r.printPdf}
        </Button>
        <Button variant="ghost" icon="school" onClick={onRecommendations}>
          {r.adjustRecommendations}
        </Button>
      </div>
    </div>
  )
}
