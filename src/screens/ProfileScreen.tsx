import { useMemo, useState } from 'react'
import type { CountryCode, ExamId, Field, UserProfile } from '../lib/types'
import { COUNTRY_LABELS, FIELD_LABELS } from '../data'
import { Badge, Button, Card, Chip, Field as FieldWrap, Icon, Notice } from '../ui/primitives'

const COUNTRIES: CountryCode[] = ['KZ', 'DE', 'IT', 'NL', 'UK', 'US', 'CA', 'TR', 'KR', 'RU']
const FIELDS = Object.keys(FIELD_LABELS) as Field[]
const EXAMS: ExamId[] = ['IELTS', 'TOEFL', 'SAT', 'ENT', 'DUOLINGO']

const emptyProfile = (): UserProfile => ({
  id: 'p-' + Math.random().toString(36).slice(2, 8),
  name: '',
  grade: 11,
  graduationYear: new Date().getFullYear() + 1,
  citizenship: 'KZ',
  targetCountries: [],
  budgetUsdPerYear: 0,
  needsScholarship: true,
  field: 'cs',
  examScores: {},
  gpa: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

export function ProfileScreen({
  initial,
  onSave
}: {
  initial: UserProfile | null
  onSave: (p: UserProfile) => void
}) {
  const [form, setForm] = useState<UserProfile>(initial ?? emptyProfile())
  const [touched, setTouched] = useState(false)

  const errors = useMemo(() => validate(form), [form])

  function patch(p: Partial<UserProfile>) {
    setForm((f) => ({ ...f, ...p }))
  }

  function toggleCountry(c: CountryCode) {
    setForm((f) => ({
      ...f,
      targetCountries: f.targetCountries.includes(c)
        ? f.targetCountries.filter((x) => x !== c)
        : [...f.targetCountries, c]
    }))
  }

  function setExam(exam: ExamId, raw: string) {
    setForm((f) => {
      const next = { ...f.examScores }
      if (raw.trim() === '') delete next[exam]
      else {
        const n = Number(raw)
        if (!Number.isNaN(n)) next[exam] = n
      }
      return { ...f, examScores: next }
    })
  }

  function submit() {
    setTouched(true)
    if (Object.keys(errors).length > 0) return
    onSave({ ...form, updatedAt: new Date().toISOString() })
  }

  const err = (k: string) => (touched ? errors[k] : undefined)

  return (
    <div className="lane">
      <div className="hero" style={{ paddingTop: 10 }}>
        <span className="eyebrow">
          <span className="dot dot-indigo" /> Step 1 · Profile intake
        </span>
        <h1 style={{ fontSize: 30 }}>Tell us about your goals</h1>
        <p className="lead">
          Eight inputs drive everything that follows. Change any of them later and the shortlist and roadmap
          recompute immediately.
        </p>
      </div>

      <Card>
        <div className="section-title" style={{ marginTop: 0 }}>
          About you
        </div>
        <div className="grid g2">
          <FieldWrap label="Name (optional)">
            <input className="input" value={form.name ?? ''} onChange={(e) => patch({ name: e.target.value })} placeholder="e.g. Aliya" />
          </FieldWrap>
          <FieldWrap label="Citizenship">
            <select className="select" value={form.citizenship} onChange={(e) => patch({ citizenship: e.target.value as CountryCode })}>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {COUNTRY_LABELS[c]}
                </option>
              ))}
            </select>
          </FieldWrap>
          <FieldWrap label="Grade" error={err('grade')}>
            <select className="select" value={form.grade} onChange={(e) => patch({ grade: Number(e.target.value) as 9 | 10 | 11 })}>
              <option value={9}>Grade 9</option>
              <option value={10}>Grade 10</option>
              <option value={11}>Grade 11</option>
            </select>
          </FieldWrap>
          <FieldWrap label="Graduation year" error={err('graduationYear')}>
            <input
              className="input"
              type="number"
              min={2026}
              max={2032}
              value={form.graduationYear || ''}
              onChange={(e) => patch({ graduationYear: Number(e.target.value) })}
            />
          </FieldWrap>
        </div>

        <div className="section-title">Academic baseline</div>
        <div className="grid g2">
          <FieldWrap label="Target discipline" error={err('field')}>
            <select className="select" value={form.field} onChange={(e) => patch({ field: e.target.value as Field })}>
              {FIELDS.map((f) => (
                <option key={f} value={f}>
                  {FIELD_LABELS[f]}
                </option>
              ))}
            </select>
          </FieldWrap>
          <FieldWrap label="GPA (0–5 scale)" error={err('gpa')} helper="0.1 steps, e.g. 4.3">
            <input
              className="input"
              type="number"
              step="0.1"
              min={0}
              max={5}
              value={form.gpa ? String(Math.round(form.gpa * 100) / 100) : ''}
              onChange={(e) => patch({ gpa: Math.round(Number(e.target.value) * 100) / 100 })}
            />
          </FieldWrap>
          <FieldWrap label="English level (optional)">
            <select
              className="select"
              value={form.englishLevel ?? ''}
              onChange={(e) => patch({ englishLevel: (e.target.value || undefined) as UserProfile['englishLevel'] })}
            >
              <option value="">Not specified</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
            </select>
          </FieldWrap>
        </div>

        <FieldWrap label="Standardised exam scores (optional, but they change eligibility)">
          <div className="grid g2">
            {EXAMS.map((ex) => (
              <div key={ex} className="row" style={{ gap: 8 }}>
                <span style={{ width: 78, fontSize: 12.5, fontWeight: 600, color: 'var(--on-surface-variant)' }}>{ex}</span>
                <input
                  className="input"
                  type="number"
                  step="0.5"
                  placeholder="score"
                  value={form.examScores[ex] ?? ''}
                  onChange={(e) => setExam(ex, e.target.value)}
                />
              </div>
            ))}
          </div>
        </FieldWrap>
      </Card>

      <Card>
        <div className="section-title" style={{ marginTop: 0 }}>
          Where and how much
        </div>
        <FieldWrap label="Target study destinations" error={err('targetCountries')}>
          <div className="chip-row">
            {COUNTRIES.map((c) => (
              <Chip key={c} on={form.targetCountries.includes(c)} onClick={() => toggleCountry(c)}>
                {COUNTRY_LABELS[c]}
              </Chip>
            ))}
          </div>
        </FieldWrap>

        <FieldWrap label="Annual tuition budget (USD)" error={err('budgetUsdPerYear')} helper="Net tuition you can cover per year, before living costs.">
          <input
            className="input"
            type="number"
            step="500"
            min={0}
            value={form.budgetUsdPerYear || ''}
            onChange={(e) => patch({ budgetUsdPerYear: Number(e.target.value) })}
          />
        </FieldWrap>
        <div className="chip-row" style={{ marginTop: -6, marginBottom: 14 }}>
          {[0, 3000, 6000, 15000, 30000, 45000].map((v) => (
            <Chip key={v} on={form.budgetUsdPerYear === v} onClick={() => patch({ budgetUsdPerYear: v })}>
              {v === 0 ? 'Grant only' : '$' + v.toLocaleString('en-US')}
            </Chip>
          ))}
        </div>

        <label className="toggle" style={{ marginBottom: 6 }}>
          <input type="checkbox" checked={form.needsScholarship} onChange={(e) => patch({ needsScholarship: e.target.checked })} />
          I need a scholarship or a low-cost option
        </label>
      </Card>

      {touched && Object.keys(errors).length > 0 && (
        <div style={{ marginTop: 12 }}>
          <Notice tone="error" icon="error">
            Please fix {Object.keys(errors).length} field{Object.keys(errors).length > 1 ? 's' : ''} before continuing.
          </Notice>
        </div>
      )}

      <div className="btn-row" style={{ marginTop: 18 }}>
        <Button icon="arrow_forward" onClick={submit}>
          Continue to diagnosis
        </Button>
        <Badge tone="neutral">Data stays in your browser (localStorage)</Badge>
      </div>
    </div>
  )
}

function validate(p: UserProfile): Record<string, string> {
  const e: Record<string, string> = {}
  if (!p.grade) e.grade = 'Choose your grade'
  if (!p.graduationYear || p.graduationYear < 2026) e.graduationYear = 'Enter a valid year'
  if (!p.field) e.field = 'Choose a discipline'
  if (!p.gpa || p.gpa <= 0 || p.gpa > 5) e.gpa = 'Enter a GPA between 0 and 5'
  if (!p.targetCountries.length) e.targetCountries = 'Pick at least one destination'
  if (p.budgetUsdPerYear === undefined || p.budgetUsdPerYear === null || p.budgetUsdPerYear < 0) e.budgetUsdPerYear = 'Enter a budget (0 for grant only)'
  return e
}
