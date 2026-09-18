# Руководство: Google Gemini API & Русская локализация

## 🎯 Подключение Google Gemini API

### Шаг 1: Получить API ключ

1. Откройте [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Нажмите **"Create API Key"** → **"Create API key in new project"**
3. Google создаст бесплатный ключ для Gemini API
4. Скопируйте ключ (он начинается с букв и цифр)

### Шаг 2: Добавить в .env

```bash
# .env (в корне проекта)
GOOGLE_AI_KEY=ваш_ключ_отсюда_aistudio.google.com
```

**⚠️ Важно:**
- `.env` НЕ коммитьте в git (уже в `.gitignore`)
- Ключ хранится безопасно на Vercel Edge Function сервере
- На клиенте передаются только данные, безопасность гарантирована

### Шаг 3: Тестировать локально

```bash
npm run dev  # http://localhost:5173
# Откройте LandingScreen → "Try demo" → Recommendations
# Нажмите toggle "AI enabled" в TopBar
# Проверьте что объяснения загружаются
```

### Шаг 4: Развернуть на Vercel

```bash
git push  # Отправьте в GitHub
# Vercel автоматически:
# 1. Развернет фронт (dist/)
# 2. Развернет api/explain.ts как Edge Function
# 3. Прочитает GOOGLE_AI_KEY из env
```

**В Vercel Dashboard:**
1. Project Settings → Environment Variables
2. Добавить: `GOOGLE_AI_KEY` = `ваш_ключ`
3. Rebuild deployment

---

## 🌍 Русская локализация (i18n)

### Как работает

Система локализации использует **рассинхронизированные переводы** с кэшированием в localStorage:

```typescript
// src/lib/i18n.ts
import { t, setLanguage, getLanguage } from '../lib/i18n'

// Получить объект переводов для категории:
const landing = t('landing')
// → { title: 'Pathly', subtitle: 'Ваш персональный путь...', start: 'Начать', ... }

// Получить язык:
const lang = getLanguage()  // 'ru' или 'en'

// Переключить язык:
setLanguage('en')  // переключит на English
localStorage.setItem('pathly:language', 'en')  // кэширует выбор
```

### Структура переводов

Все переводы в **одном файле** `src/lib/i18n.ts`:

```typescript
const translations = {
  ru: {
    landing: { title, subtitle, description, ... },
    profile: { title, errors, ... },
    nav: { profile, diagnosis, ... },
    factors: { budget: 'Финансовая подходимость', ... },
    countries: { KZ: 'Казахстан', ... },
    fields: { cs: 'Информатика', ... }
  },
  en: { /* то же самое, но на English */ }
}
```

### Использование в компонентах

#### Простой способ (основной):
```typescript
import { t } from '../lib/i18n'

export function MyScreen() {
  const landing = t('landing')
  return <h1>{landing.title}</h1>
}
```

#### Динамический способ (для путей):
```typescript
import { tValue } from '../lib/i18n'

const budgetLabel = tValue('profile.budget')  // "Бюджет в год (USD)"
```

### Переключение языка

**LanguageSwitcher компонент** (РУ/EN кнопки):
```typescript
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

export function TopBar() {
  return (
    <header>
      <h1>Pathly</h1>
      <LanguageSwitcher />  {/* ← РУ/EN кнопки */}
    </header>
  )
}
```

При клике на язык:
1. `setLanguage('en')` сохраняет выбор в localStorage
2. `window.location.reload()` перезагружает страницу с новым языком
3. Все компоненты автоматически используют `t()` с новым языком

---

## ➕ Добавить новый язык (например, Казахский)

### 1. Обновить тип Language в `src/lib/i18n.ts`:
```typescript
export type Language = 'ru' | 'en' | 'kk'  // добавить 'kk'
```

### 2. Добавить перевод:
```typescript
const translations = {
  ru: { ... },
  en: { ... },
  kk: {
    landing: { 
      title: 'Pathly',
      subtitle: 'Сіздің жеке құлыптау жолы',
      description: '...',
      // и т.д.
    },
    // остальные категории...
  }
} as const
```

### 3. Обновить LanguageSwitcher (опционально):
```typescript
// src/ui/LanguageSwitcher.tsx
<button onClick={() => setLanguage('kk')}>ҚА</button>
```

---

## 🤖 Как работает AI объяснение

### Flow:
1. **Frontend** → пользователь включает AI toggle в TopBar
2. **AppState** → `explainRecommendations()` отправляет `/api/explain` запрос
3. **Edge Function** (`api/explain.ts`):
   - Читает `GOOGLE_AI_KEY` из env
   - Отправляет payload в Google Gemini API
   - Парсит JSON ответ
   - Валидирует структуру
   - Возвращает `{ items: [...] }`
4. **Frontend** → если AI успешен, показывает AI объяснения; если нет → fallback шаблоны
5. **Cache** → `explanation` кэшируется в `Recommendation` объекте

### Fallback шаблоны (всегда доступны):

Если AI:
- Отключен пользователем
- Недоступен (offline, timeout, 502)
- Вернул некорректный JSON
- Не обслуживается на хосте (например, GitHub Pages)

**Тогда используется `fallbackExplanation()`** из `src/lib/explainFallback.ts`:
- Детерминированный текст на основе score breakdown
- Поддерживает RU и EN
- Никогда не придумывает факты
- Всегда воспроизводим

### Пример:
```typescript
// Score: 72.5, Fit: HIGH
// Breakdown: budget 90%, field 80%, country 70%, academic 75%, ...

// Fallback объяснение:
{
  whyItFits: "TUM CS набирает 72.5% соответствия вашему профилю. 
              Главные факторы: финансовая подходимость (90%) и соответствие специальности (80%). 
              Стоимость обучения $0 в год.",
  concerns: ["Сроки подачи — амбициозный вариант (2 месяца)"],
  nextStepHint: "Откройте дорожную карту и начните с выделенного действия.",
  origin: 'fallback'
}

// AI объяснение (если включено):
{
  whyItFits: "TUM is an excellent fit for your computer science goals. 
              The curriculum aligns perfectly with your profile, and the tuition is affordable.",
  concerns: ["Tight application deadline"],
  nextStepHint: "Check the exact submission requirements on TUM's website and prepare your documents.",
  origin: 'ai'
}
```

---

## ✅ Чек-лист для локализации

При добавлении новой фичи убедитесь:

- [ ] Все текстовые строки в компонентах используют `t()` функцию
- [ ] Новые категории переводов добавлены в `src/lib/i18n.ts`
- [ ] Оба языка (ru, en) содержат все ключи
- [ ] LanguageSwitcher доступен на LandingScreen
- [ ] Fallback объяснения поддерживают оба языка
- [ ] Протестировано переключение между языками (РУ → EN → РУ)
- [ ] localStorage сохраняет выбор языка после перезагрузки

---

## 🐛 Отладка

### Проверить текущий язык в консоли:
```javascript
localStorage.getItem('pathly:language')  // 'ru' или 'en'
```

### Переключить язык вручную:
```javascript
localStorage.setItem('pathly:language', 'en')
location.reload()
```

### Проверить загрузку AI:
```javascript
// В Network tab DevTools найдите запрос POST к `/api/explain`
// Response должен быть:
{
  items: [
    { programId: 'tum-cs', whyItFits: '...', concerns: [...], nextStepHint: '...' },
    ...
  ]
}

// Или если ошибка:
{ error: 'AI unavailable' }  // → использует fallback
```

### Переменные окружения:
```bash
echo $env:GOOGLE_AI_KEY  # PowerShell
echo $GOOGLE_AI_KEY      # Bash
```

---

## 📚 Полезные ссылки

- [Google AI Studio](https://aistudio.google.com/app/apikey)
- [Gemini API Documentation](https://ai.google.dev/docs/gemini_api_overview)
- [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)
- [Pathly i18n System](./src/lib/i18n.ts)
- [LandingScreen с LanguageSwitcher](./src/screens/LandingScreen.tsx)
