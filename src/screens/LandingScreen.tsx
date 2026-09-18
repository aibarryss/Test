import { Badge, Button, Card, Icon } from '../ui/primitives'
import { Logo } from '../ui/layout'
import { t } from '../lib/i18n'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

export function LandingScreen({
  onStart,
  onDemo,
  hasProfile
}: {
  onStart: () => void
  onDemo: () => void
  hasProfile: boolean
}) {
  const landing = t('landing')
  const common = t('common')
  
  return (
    <div>
      <section className="hero">
        <span className="glow glow-a" />
        <span className="glow glow-b" />
        
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <LanguageSwitcher />
        </div>

        <div className="grid g2" style={{ alignItems: 'center', gridTemplateColumns: 'minmax(0,1.3fr) minmax(280px,1fr)' }}>
          <div>
            <span className="eyebrow">
              <span className="dot dot-emerald" /> {landing.subtitle}
            </span>
            <h1>
              Pathly <span style={{ color: 'var(--primary-container)' }}>— персональный путь поступления</span>
            </h1>
            <p className="lead">
              {landing.description}
            </p>
            <div className="btn-row" style={{ marginTop: 20 }}>
              <Button icon="arrow_forward" onClick={onStart}>
                {hasProfile ? 'Продолжить' : landing.start}
              </Button>
              <Button variant="secondary" icon="bolt" onClick={onDemo}>
                {landing.demo}
              </Button>
            </div>
            <div className="steps-strip">
              <div className="active">
                01 Профиль <span>Учеба и бюджет</span>
              </div>
              <div>
                02 Подбор <span>Диагностика</span>
              </div>
              <div>
                03 Сравнение <span>Стоимость и требования</span>
              </div>
              <div>
                04 План <span>Дорожная карта</span>
              </div>
            </div>
          </div>

          <Card>
            <div className="spread" style={{ marginBottom: 12 }}>
              <div className="row" style={{ gap: 8 }}>
                <span className="dot dot-emerald" />
                <strong style={{ fontSize: 15 }}>Мой профиль поступления</strong>
              </div>
              <Badge tone="neutral">2027</Badge>
            </div>
            <div className="ai-memo">
              <div className="spread">
                <span style={{ fontWeight: 700 }}>Готовность к поступлению</span>
              </div>
              <div className="progress-track" style={{ marginTop: 10 }}>
                <div className="progress-fill" style={{ width: '86%' }} />
              </div>
              <div className="spread helper" style={{ marginTop: 8 }}>
                <span>Уровень: продвинутый</span>
                <span>Регион: первый уровень</span>
              </div>
            </div>
            <div className="panel" style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <span className="dot dot-indigo" style={{ width: 34, height: 34, borderRadius: 10, display: 'inline-flex' }} />
              <div>
                <div style={{ fontWeight: 700 }}>Детерминированный скоринг</div>
                <div className="helper">Каждая рекомендация воспроизводима и проверяема.</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="section-title">Что делает Pathly особенным</div>
      <div className="grid g3">
        {[
          { i: 'tune', t: 'Прозрачные факторы оценки', d: 'Каждый вариант показывает свои веса: бюджет, специальность, страна, успеваемость, язык, сроки и финансирование.' },
          { i: 'balance', t: 'Без лишних обещаний', d: 'Нет кликбейта с процентами принятия. Только оценка соответствия, которую можно объяснить строка за строкой.' },
          { i: 'fact_check', t: 'Проверенные источники', d: 'Факты имеют ссылки на источники; все непроверенное помечено как демонстрационные данные.' }
        ].map((f) => (
          <Card key={f.t}>
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'var(--surface-container)',
                color: 'var(--primary-container)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10
              }}
            >
              <Icon name={f.i} />
            </span>
            <h3 className="card-title" style={{ marginBottom: 6 }}>
              {f.t}
            </h3>
            <p className="card-sub">{f.d}</p>
          </Card>
        ))}
      </div>

      <div className="panel" style={{ marginTop: 24, display: 'flex', gap: 18, justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ maxWidth: 520 }}>
          <div className="label" style={{ color: 'var(--primary-container)' }}>
            Для студентов и родителей
          </div>
          <h3 className="card-title" style={{ margin: '6px 0' }}>
            Создано для школьников, которые ценят ясность информации.
          </h3>
          <p className="card-sub">
            Начните рано, сохраняйте здравомыслие и организуйте все требования в одном месте.
          </p>
        </div>
        <div className="btn-row">
          <Button onClick={onStart}>{landing.start}</Button>
          <Button variant="secondary" onClick={onDemo}>
            {landing.demo}
          </Button>
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: '1px solid var(--line)',
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          color: 'var(--on-surface-variant)',
          fontSize: 12.5,
          flexWrap: 'wrap'
        }}
      >
        <Logo size={26} />
        <span>Pathly на базе детерминированного скоринга · демонстрационный датасет</span>
      </div>
    </div>
  )
}
