import { SOURCES, UNIVERSITIES, PROGRAMS } from '../data'
import { Badge, Card, Notice } from '../ui/primitives'

export function SourcesScreen() {
  const official = SOURCES.filter((s) => s.kind === 'official')
  const demo = SOURCES.filter((s) => s.kind === 'demo')

  return (
    <div>
      <div className="hero" style={{ paddingTop: 10, paddingBottom: 6 }}>
        <span className="eyebrow">
          <span className="dot dot-ochre" /> Transparency
        </span>
        <h1 style={{ fontSize: 30 }}>Data &amp; sources</h1>
        <p className="lead">
          Facts carry sources. Anything we could not verify against an official page is labelled as
          demonstrative data — on the card, in the comparison and in the roadmap.
        </p>
      </div>

      <div className="metrics" style={{ marginBottom: 14 }}>
        <div className="metric">
          <div className="v">{UNIVERSITIES.length}</div>
          <div className="l">Universities in dataset</div>
        </div>
        <div className="metric">
          <div className="v">{PROGRAMS.length}</div>
          <div className="l">Programs</div>
        </div>
        <div className="metric">
          <div className="v">{official.length}</div>
          <div className="l">Official source links</div>
        </div>
        <div className="metric">
          <div className="v">{demo.length}</div>
          <div className="l">Demonstrative entries</div>
        </div>
      </div>

      <Notice tone="warn" icon="warning">
        Numeric values in this MVP (tuition, exam thresholds, deadlines) are demonstrative. Source links point to
        the official admissions sections so each figure can be verified before submission.
      </Notice>

      <Card className="card" >
        <div className="card-head">
          <span className="card-title">Official sources</span>
          <Badge tone="fit-high">verified links</Badge>
        </div>
        <div className="stack">
          {official.map((s) => (
            <div key={s.id} className="spread" style={{ gap: 12, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 0 }}>
                <a href={s.url} target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>
                  {s.title}
                </a>
                <div className="helper">{s.url}</div>
                {s.note && <div className="helper" style={{ marginTop: 2 }}>{s.note}</div>}
              </div>
              <Badge tone="neutral">{s.accessedAt ?? 'n/a'}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {demo.length > 0 && (
        <Card>
          <div className="card-head">
            <span className="card-title">Demonstrative entries</span>
            <Badge tone="demo">demo data</Badge>
          </div>
          <div className="stack">
            {demo.map((s) => (
              <div key={s.id}>
                <div style={{ fontWeight: 700 }}>{s.title}</div>
                {s.note && <div className="helper">{s.note}</div>}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <div className="section-title" style={{ marginTop: 0 }}>
          Methodology
        </div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Every recommendation is produced by a deterministic 7-factor weighted score — not by a language model.</li>
          <li>The model only rephrases facts the engine already computed, and always has a template fallback.</li>
          <li>Hard filters remove only what is clearly impossible; country, subject and cost stay as weighted factors.</li>
          <li>Missing data lowers the confidence badge instead of inventing a value.</li>
        </ul>
      </Card>
    </div>
  )
}
