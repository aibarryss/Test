import { SOURCES, UNIVERSITIES, PROGRAMS } from '../data'
import { Badge, Card, Notice } from '../ui/primitives'
import { t } from '../lib/i18n'

export function SourcesScreen() {
  const s = t('sources')
  const official = SOURCES.filter((x) => x.kind === 'official')
  const demo = SOURCES.filter((x) => x.kind === 'demo')

  return (
    <div>
      <div className="hero" style={{ paddingTop: 10, paddingBottom: 6 }}>
        <span className="eyebrow">
          <span className="dot dot-ochre" /> {s.step}
        </span>
        <h1 style={{ fontSize: 30 }}>{s.title}</h1>
        <p className="lead">{s.description}</p>
      </div>

      <div className="metrics" style={{ marginBottom: 14 }}>
        <div className="metric">
          <div className="v">{UNIVERSITIES.length}</div>
          <div className="l">{s.universitiesInDataset}</div>
        </div>
        <div className="metric">
          <div className="v">{PROGRAMS.length}</div>
          <div className="l">{s.programsInDataset}</div>
        </div>
        <div className="metric">
          <div className="v">{official.length}</div>
          <div className="l">{s.officialLinks}</div>
        </div>
        <div className="metric">
          <div className="v">{demo.length}</div>
          <div className="l">{s.demoEntries}</div>
        </div>
      </div>

      <Notice tone="warn" icon="warning">
        {s.valuesDemoNotice}
      </Notice>

      <Card className="card" >
        <div className="card-head">
          <span className="card-title">{s.officialSourcesTitle}</span>
          <Badge tone="fit-high">{s.verifiedLinks}</Badge>
        </div>
        <div className="stack">
          {official.map((x) => (
            <div key={x.id} className="spread" style={{ gap: 12, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 0 }}>
                <a href={x.url} target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>
                  {x.title}
                </a>
                <div className="helper">{x.url}</div>
                {x.note && <div className="helper" style={{ marginTop: 2 }}>{x.note}</div>}
              </div>
              <Badge tone="neutral">{x.accessedAt ?? s.notAvailable}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {demo.length > 0 && (
        <Card>
          <div className="card-head">
            <span className="card-title">{s.demoEntriesTitle}</span>
            <Badge tone="demo">{s.demo}</Badge>
          </div>
          <div className="stack">
            {demo.map((x) => (
              <div key={x.id}>
                <div style={{ fontWeight: 700 }}>{x.title}</div>
                {x.note && <div className="helper">{x.note}</div>}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <div className="section-title" style={{ marginTop: 0 }}>
          {s.methodology}
        </div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>{s.methodology1}</li>
          <li>{s.methodology2}</li>
          <li>{s.methodology3}</li>
          <li>{s.methodology4}</li>
        </ul>
      </Card>
    </div>
  )
}
