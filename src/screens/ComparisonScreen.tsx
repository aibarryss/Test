import { useMemo } from 'react'
import { COUNTRY_LABELS } from '../data'
import { Badge, Button, Card, Chip, EmptyState, Icon, fitLabel, fitTone } from '../ui/primitives'
import { useApp } from '../state/AppState'
import { formatUsd } from '../lib/format'

export function ComparisonScreen({ onBack, onRoadmap }: { onBack: () => void; onRoadmap: () => void }) {
  const { state, dispatch, programMap, uniMap, recommendations } = useApp()

  const selected = useMemo(() => {
    const ids = state.selectedProgramIds
    const fromRecs = recommendations.filter((r) => ids.includes(r.programId))
    return fromRecs
  }, [state.selectedProgramIds, recommendations])

  const rows = useMemo(() => {
    const all = recommendations.map((r) => ({ r, p: programMap[r.programId], u: uniMap[r.universityId] }))
    return all.filter((x) => x.p && x.u)
  }, [recommendations, programMap, uniMap])

  if (selected.length < 2) {
    return (
      <div className="lane">
        <div className="hero" style={{ paddingTop: 10, paddingBottom: 6 }}>
          <span className="eyebrow">
            <span className="dot dot-indigo" /> Step 4 · Comparison
          </span>
          <h1 style={{ fontSize: 28 }}>Compare your options</h1>
        </div>
        <EmptyState title="Select at least two programs" text="Go back to the recommendations and tick two or three programs to compare them side by side.">
          <Button onClick={onBack}>Back to recommendations</Button>
        </EmptyState>
        <AddPicker rows={rows} selectedIds={state.selectedProgramIds} onToggle={(id) => dispatch({ type: 'selection/toggle', programId: id })} />
      </div>
    )
  }

  const cells: { label: string; render: (x: (typeof selected)[number]) => React.ReactNode }[] = [
    {
      label: 'University',
      render: (r) => (
        <div>
          <div style={{ fontWeight: 700 }}>{uniMap[r.universityId]?.name}</div>
          <div className="helper">
            {uniMap[r.universityId]?.city}, {COUNTRY_LABELS[uniMap[r.universityId]?.country ?? 'KZ']}
          </div>
        </div>
      )
    },
    { label: 'Program', render: (r) => programMap[r.programId]?.name },
    {
      label: 'Fit score',
      render: (r) => (
        <div className="row" style={{ gap: 6 }}>
          <Badge tone={fitTone(r.fit)}>{fitLabel(r.fit)}</Badge>
          <strong>{Math.round(r.score)}%</strong>
        </div>
      )
    },
    { label: 'Net tuition / year', render: (r) => formatUsd(programMap[r.programId]?.netTuitionUsdPerYear ?? 0) },
    { label: 'Living cost / year', render: (r) => formatUsd(uniMap[r.universityId]?.livingCostUsdPerYear ?? 0) },
    {
      label: 'Est. total / year',
      render: (r) =>
        formatUsd((programMap[r.programId]?.netTuitionUsdPerYear ?? 0) + (uniMap[r.universityId]?.livingCostUsdPerYear ?? 0))
    },
    {
      label: 'Exam requirements',
      render: (r) =>
        programMap[r.programId]?.requirements.exams.map((e) => `${e.exam} ${e.minScore}`).join(', ') || 'None listed'
    },
    { label: 'Min GPA', render: (r) => programMap[r.programId]?.requirements.minGpa ?? '—' },
    {
      label: 'Teaching language',
      render: (r) => programMap[r.programId]?.languagesOfInstruction.join(', ').toUpperCase()
    },
    { label: 'Duration', render: (r) => `${programMap[r.programId]?.durationYears} years` },
    {
      label: 'Deadlines',
      render: (r) => (
        <div>
          {programMap[r.programId]?.deadlines.map((d) => (
            <div key={d.id} style={{ marginBottom: 4 }}>
              {d.date} · {d.label} {d.isDemo && <Badge tone="demo">demo</Badge>}
            </div>
          ))}
          {programMap[r.programId]?.deadlines.length === 0 && <span className="helper">Not recorded</span>}
        </div>
      )
    },
    {
      label: 'Main constraint',
      render: (r) => (r.warnings[0] ? <Chip><Icon name="warning" size={14} /> {r.warnings[0]}</Chip> : <span className="helper">None flagged</span>)
    }
  ]

  return (
    <div>
      <div className="hero" style={{ paddingTop: 10, paddingBottom: 6 }}>
        <span className="eyebrow">
          <span className="dot dot-indigo" /> Step 4 · Comparison
        </span>
        <h1 style={{ fontSize: 30 }}>Compare your options</h1>
        <p className="lead">Side by side on the criteria that actually change a decision: cost, requirements, language and deadlines.</p>
      </div>

      <div className="table-wrap">
        <table className="compare">
          <thead>
            <tr>
              <th style={{ width: 150 }}>Criterion</th>
              {selected.map((r) => (
                <th key={r.programId}>
                  <div className="spread">
                    <span>{uniMap[r.universityId]?.name}</span>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: 0, minHeight: 0 }}
                      title="Remove"
                      onClick={() => dispatch({ type: 'selection/toggle', programId: r.programId })}
                    >
                      <Icon name="close" size={16} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map((c) => (
              <tr key={c.label}>
                <td className="label-cell">{c.label}</td>
                {selected.map((r) => (
                  <td key={r.programId}>{c.render(r)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn-row" style={{ marginTop: 16 }}>
        <Button variant="secondary" icon="arrow_back" onClick={onBack}>
          Back to recommendations
        </Button>
        <Button icon="route" onClick={onRoadmap}>
          Build my roadmap
        </Button>
      </div>

      <AddPicker rows={rows} selectedIds={state.selectedProgramIds} onToggle={(id) => dispatch({ type: 'selection/toggle', programId: id })} />
    </div>
  )
}

function AddPicker({
  rows,
  selectedIds,
  onToggle
}: {
  rows: { r: any; p: any; u: any }[]
  selectedIds: string[]
  onToggle: (id: string) => void
}) {
  return (
    <Card className="card" >
      <div className="label" style={{ marginBottom: 8 }}>
        Add or remove programs
      </div>
      <div className="chip-row">
        {rows.map(({ r, p, u }) => (
          <Chip key={r.programId} on={selectedIds.includes(r.programId)} onClick={() => onToggle(r.programId)}>
            {u.name} · {p.name} ({Math.round(r.score)}%)
          </Chip>
        ))}
      </div>
    </Card>
  )
}
