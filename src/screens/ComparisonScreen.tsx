import { useMemo } from 'react'
import { COUNTRY_LABELS, localizedDeadlineLabel } from '../data'
import { Badge, Button, Card, Chip, EmptyState, Icon, fitLabel, fitTone } from '../ui/primitives'
import { useApp } from '../state/AppState'
import { formatUsd } from '../lib/format'
import { t } from '../lib/i18n'

export function ComparisonScreen({ onBack, onRoadmap }: { onBack: () => void; onRoadmap: () => void }) {
  const { state, dispatch, programMap, uniMap, recommendations } = useApp()
  const c = t('comparison')

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
            <span className="dot dot-indigo" /> {c.step}
          </span>
          <h1 style={{ fontSize: 28 }}>{c.title}</h1>
        </div>
        <EmptyState title={c.needTwoTitle} text={c.needTwoText}>
          <Button onClick={onBack}>{c.backToRecommendations}</Button>
        </EmptyState>
        <AddPicker rows={rows} selectedIds={state.selectedProgramIds} onToggle={(id) => dispatch({ type: 'selection/toggle', programId: id })} />
      </div>
    )
  }

  const cells: { label: string; render: (x: (typeof selected)[number]) => React.ReactNode }[] = [
    {
      label: c.university,
      render: (r) => (
        <div>
          <div style={{ fontWeight: 700 }}>{uniMap[r.universityId]?.name}</div>
          <div className="helper">
            {uniMap[r.universityId]?.city}, {COUNTRY_LABELS[uniMap[r.universityId]?.country ?? 'KZ']}
          </div>
        </div>
      )
    },
    { label: c.program, render: (r) => programMap[r.programId]?.name },
    {
      label: c.fitScore,
      render: (r) => (
        <div className="row" style={{ gap: 6 }}>
          <Badge tone={fitTone(r.fit)}>{fitLabel(r.fit)}</Badge>
          <strong>{Math.round(r.score)}%</strong>
        </div>
      )
    },
    { label: c.netTuition, render: (r) => formatUsd(programMap[r.programId]?.netTuitionUsdPerYear ?? 0) },
    { label: c.livingCost, render: (r) => formatUsd(uniMap[r.universityId]?.livingCostUsdPerYear ?? 0) },
    {
      label: c.totalCost,
      render: (r) =>
        formatUsd((programMap[r.programId]?.netTuitionUsdPerYear ?? 0) + (uniMap[r.universityId]?.livingCostUsdPerYear ?? 0))
    },
    {
      label: c.examRequirements,
      render: (r) =>
        programMap[r.programId]?.requirements.exams.map((e) => `${e.exam} ${e.minScore}`).join(', ') || c.noneListed
    },
    { label: c.minGpa, render: (r) => programMap[r.programId]?.requirements.minGpa ?? '—' },
    {
      label: c.teachingLanguage,
      render: (r) => programMap[r.programId]?.languagesOfInstruction.join(', ').toUpperCase()
    },
    { label: c.duration, render: (r) => `${programMap[r.programId]?.durationYears} ${c.years}` },
    {
      label: c.deadlines,
      render: (r) => (
        <div>
          {programMap[r.programId]?.deadlines.map((d) => (
            <div key={d.id} style={{ marginBottom: 4 }}>
              {d.date} · {localizedDeadlineLabel(d)} {d.isDemo && <Badge tone="demo">{c.demo}</Badge>}
            </div>
          ))}
          {programMap[r.programId]?.deadlines.length === 0 && <span className="helper">{c.notRecorded}</span>}
        </div>
      )
    },
    {
      label: c.mainConstraint,
      render: (r) => (r.warnings[0] ? <Chip><Icon name="warning" size={14} /> {r.warnings[0]}</Chip> : <span className="helper">{c.noneFlagged}</span>)
    }
  ]

  return (
    <div>
      <div className="hero" style={{ paddingTop: 10, paddingBottom: 6 }}>
        <span className="eyebrow">
          <span className="dot dot-indigo" /> {c.step}
        </span>
        <h1 style={{ fontSize: 30 }}>{c.title}</h1>
        <p className="lead">{c.subtitle}</p>
      </div>

      <div className="table-wrap">
        <table className="compare">
          <thead>
            <tr>
              <th style={{ width: 150 }}>{c.criterion}</th>
              {selected.map((r) => (
                <th key={r.programId}>
                  <div className="spread">
                    <span>{uniMap[r.universityId]?.name}</span>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: 0, minHeight: 0 }}
                      title={c.remove}
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
            {cells.map((cell) => (
              <tr key={cell.label}>
                <td className="label-cell">{cell.label}</td>
                {selected.map((r) => (
                  <td key={r.programId}>{cell.render(r)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn-row" style={{ marginTop: 16 }}>
        <Button variant="secondary" icon="arrow_back" onClick={onBack}>
          {c.backToRecommendations}
        </Button>
        <Button icon="route" onClick={onRoadmap}>
          {c.buildRoadmap}
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
        {t('comparison').addOrRemove}
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
