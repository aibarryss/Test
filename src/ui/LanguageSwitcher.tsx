import { getLanguage, setLanguage } from '../lib/i18n'

export function LanguageSwitcher() {
  const current = getLanguage()

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button
        className={`btn ${current === 'ru' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: 12, padding: '4px 8px' }}
        onClick={() => {
          setLanguage('ru')
          window.location.reload()
        }}
      >
        РУ
      </button>
      <button
        className={`btn ${current === 'en' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: 12, padding: '4px 8px' }}
        onClick={() => {
          setLanguage('en')
          window.location.reload()
        }}
      >
        EN
      </button>
    </div>
  )
}
