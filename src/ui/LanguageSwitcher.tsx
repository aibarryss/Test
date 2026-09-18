import { setLanguage } from '../lib/i18n'
import { useLanguage } from '../lib/useLanguage'

export function LanguageSwitcher() {
  const current = useLanguage()

  const switchTo = (lang: 'ru' | 'en') => {
    if (lang !== current) setLanguage(lang)
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button
        className={`btn ${current === 'ru' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: 12, padding: '4px 8px' }}
        onClick={() => switchTo('ru')}
      >
        РУ
      </button>
      <button
        className={`btn ${current === 'en' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: 12, padding: '4px 8px' }}
        onClick={() => switchTo('en')}
      >
        EN
      </button>
    </div>
  )
}
