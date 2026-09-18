import { useMemo, useState } from 'react'
import type { Diagnosis, UserProfile } from '../lib/types'
import { COUNTRY_LABELS, FIELD_LABELS, localizedQuestions } from '../data'
import { Badge, Button, Card, Icon, Notice, ProgressBar } from '../ui/primitives'
import { isDiagnosisComplete, runDiagnosis, type AnswerMap } from '../features/diagnosis/diagnosisEngine'
import { t } from '../lib/i18n'

export function DiagnosisScreen({
  profile,
  savedAnswers,
  onComplete,
  onSkip,
  onBack
}: {
  profile: UserProfile
  savedAnswers: AnswerMap
  savedDiagnosis: Diagnosis | null
  onComplete: (answers: AnswerMap, diagnosis: Diagnosis) => void
  onSkip: () => void
  onBack: () => void
}) {
  const [answers, setAnswers] = useState<AnswerMap>(savedAnswers)
  const [index, setIndex] = useState(0)

  const questions = useMemo(() => localizedQuestions(), [])

  const complete = isDiagnosisComplete(answers)
  const diagnosis = useMemo(() => (complete ? runDiagnosis(answers, profile) : null), [complete, answers, profile])
  const q = questions[index]

  function pick(value: string) {
    const next = { ...answers, [q.id]: value }
    setAnswers(next)
    if (index < questions.length - 1) {
      setTimeout(() => setIndex((i) => i + 1), 120)
    }
  }

  if (complete && diagnosis) {
    return <DiagnosisResult profile={profile} diagnosis={diagnosis} onContinue={() => onComplete(answers, diagnosis)} onBack={onBack} />
  }

  const answered = Object.keys(answers).length
  const diagnosis_t = t('diagnosis')

  return (
    <div className="lane">
      <div className="hero" style={{ paddingTop: 10, paddingBottom: 8 }}>
        <span className="eyebrow">
          <span className="dot dot-indigo" /> Step 2 · {diagnosis_t.step}
        </span>
        <h1 style={{ fontSize: 28 }}>{diagnosis_t.title}</h1>
        <p className="lead">
          {diagnosis_t.subtitle}
        </p>
      </div>

      <div className="row" style={{ margin: '4px 0 6px', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <ProgressBar percent={Math.round((answered / questions.length) * 100)} />
        </div>
        <span className="stamp">
          {answered}/{questions.length}
        </span>
      </div>

      <Card>
        <div className="card-sub" style={{ marginBottom: 6 }}>
          {diagnosis_t.questionOf} {index + 1} {diagnosis_t.of} {questions.length}
        </div>
        <h3 className="card-title" style={{ fontSize: 18, marginBottom: 4 }}>
          {q.prompt}
        </h3>
        {q.helper && <p className="card-sub" style={{ marginBottom: 8 }}>{q.helper}</p>}

        <div className="stack" style={{ marginTop: 12 }}>
          {q.options.map((o) => (
            <div
              key={o.value}
              className="panel"
              style={{
                cursor: 'pointer',
                borderColor: answers[q.id] === o.value ? 'var(--primary-container)' : undefined,
                background: answers[q.id] === o.value ? '#f5f5ff' : undefined
              }}
              onClick={() => pick(o.value)}
            >
              <div className="spread">
                <span style={{ fontWeight: 600 }}>{o.label}</span>
                {answers[q.id] === o.value && <Icon name="check_circle" size={20} />}
              </div>
            </div>
          ))}
        </div>

        <div className="btn-row" style={{ marginTop: 16 }}>
          <Button variant="secondary" icon="arrow_back" onClick={() => (index === 0 ? onBack() : setIndex((i) => i - 1))} disabled={index === 0 && false}>
            {diagnosis_t.back}
          </Button>
          {index < questions.length - 1 && (
            <Button variant="ghost" onClick={() => setIndex((i) => i + 1)} disabled={!answers[q.id]}>
              {diagnosis_t.nextQuestion}
            </Button>
          )}
          <div style={{ flex: 1 }} />
          <Button variant="ghost" onClick={onSkip}>
            {diagnosis_t.skip}
          </Button>
        </div>
      </Card>
    </div>
  )
}

function DiagnosisResult({
  profile,
  diagnosis,
  onContinue,
  onBack
}: {
  profile: UserProfile
  diagnosis: Diagnosis
  onContinue: () => void
  onBack: () => void
}) {
  const { strengths, gaps, recommendedField, recommendedCountries } = diagnosis.derived
  const diagnosis_t = t('diagnosis')
  return (
    <div className="lane">
      <div className="hero" style={{ paddingTop: 10, paddingBottom: 8 }}>
        <span className="eyebrow">
          <span className="dot dot-emerald" /> {diagnosis_t.resultComplete}
        </span>
        <h1 style={{ fontSize: 28 }}>{diagnosis_t.resultTitle}</h1>
        <p className="lead">{diagnosis_t.resultSubtitle}</p>
      </div>

      <div className="grid g2">
        <Card>
          <div className="card-head">
            <div>
              <div className="label" style={{ marginBottom: 4 }}>
                {diagnosis_t.strengths}
              </div>
              <div className="card-title">{strengths.length} {diagnosis_t.signals}</div>
            </div>
            <Badge tone="fit-high" dot="dot-emerald">
              {diagnosis_t.positive}
            </Badge>
          </div>
          {strengths.length === 0 ? (
            <p className="card-sub">{diagnosis_t.noStrengths}</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {strengths.map((s) => (
                <li key={s} style={{ marginBottom: 4 }}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className="card-head">
            <div>
              <div className="label" style={{ marginBottom: 4 }}>
                {diagnosis_t.gaps}
              </div>
              <div className="card-title">{gaps.length} {diagnosis_t.signals}</div>
            </div>
            <Badge tone="fit-medium" dot="dot-ochre">
              {diagnosis_t.attention}
            </Badge>
          </div>
          {gaps.length === 0 ? (
            <p className="card-sub">{diagnosis_t.noGaps}</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {gaps.map((s) => (
                <li key={s} style={{ marginBottom: 4 }}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card>
        <div className="section-title" style={{ marginTop: 0 }}>
          Diagnostic pointers
        </div>
        <div className="grid g3">
          <div>
            <div className="label">Advisory discipline</div>
            <div style={{ fontWeight: 700 }}>{recommendedField ? FIELD_LABELS[recommendedField] : 'Open'}</div>
            <div className="helper">Your profile choice stays {FIELD_LABELS[profile.field]}.</div>
          </div>
          <div>
            <div className="label">Advisory destinations</div>
            <div style={{ fontWeight: 700 }}>
              {recommendedCountries && recommendedCountries.length ? recommendedCountries.map((c) => COUNTRY_LABELS[c]).join(', ') : 'Open'}
            </div>
            <div className="helper">These only nudge the scoring, they do not filter.</div>
          </div>
          <div>
            <div className="label">Profile completeness</div>
            <div style={{ fontWeight: 700 }}>{diagnosis.missingProfileFields.length === 0 ? 'Complete' : `${diagnosis.missingProfileFields.length} gaps`}</div>
            <div className="helper">{diagnosis.missingProfileFields.join(', ') || 'All key fields filled'}</div>
          </div>
        </div>
      </Card>

      {diagnosis.missingProfileFields.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <Notice tone="warn" icon="info">
            Missing: {diagnosis.missingProfileFields.join(', ')}. Recommendations still generate, but confidence
            is reduced for those factors.
          </Notice>
        </div>
      )}

      <div className="btn-row" style={{ marginTop: 18 }}>
        <Button icon="school" onClick={onContinue}>
          See my recommendations
        </Button>
        <Button variant="secondary" icon="arrow_back" onClick={onBack}>
          Edit profile
        </Button>
      </div>
    </div>
  )
}
