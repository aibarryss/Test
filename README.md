# Pathly — Личный маршрут поступления (LOCUS Startup Hackathon 2026, Кейс #2)

Рабочий MVP портала для индивидуального планирования поступления в университеты. Студент заполняет профиль, проходит короткую диагностику и получает:
- **Оценённый shortlist** (5 рекомендаций с объяснениями)
- **Сравнение side-by-side** (стоимость, требования, дедлайны)
- **Пошаговую дорожную карту** с одним выделенным действием
- **Отслеживание прогресса**

**Дизайн:** Google Stitch Design System — "Clarity & Trajectory" (`docs/DESIGN.md`).

**Поддерживаемые языки:** 🇷🇺 Русский (по умолчанию) и 🇬🇧 English

## Архитектура

Продукт **полностью работает на клиенте**. Фильтрация, скоринг, диагностика, дорожная карта и прогресс — это чистые TypeScript-функции, работающие в браузере. Единственная сетевая зависимость — опциональный `/api/explain` endpoint, который обращается к **Google Gemini API** для переформулировки фактов, которые уже вычислил движок.

```
Профиль → нормализация → жесткий фильтр → мягкие гейты → 7-факторный взвешенный скоринг
        → топ кандидаты → объяснение из ИИ (или шаблон) → сравнение → дорожная карта → прогресс
```

## Стек

| Слой | Выбор |
|---|---|
| Frontend | React 18 + TypeScript + Vite (SPA, mobile-first) |
| Стилизация | Дизайн-токены из Stitch `DESIGN.md` (чистый CSS, без build step) |
| Локализация | i18n система с поддержкой РУ и EN (`src/lib/i18n.ts`) |
| Маршрутизация | react-router-dom (`HashRouter`, работает на любом статическом хосте) |
| Состояние | React Context + `useReducer`, сохранено в `localStorage` |
| Данные | JSON файлы в `src/data`, типизированы `src/lib/types.ts`, каждый факт несет `sourceIds` |
| Логика | чистый TypeScript в `src/features/**` |
| AI | Vercel Edge Function `api/explain.ts` (опциональна, с fallback) → **Google Gemini 1.5 Flash** |
| Тесты | Vitest (`npm test`) |

## Запуск

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 23 юнит-теста (scoring, filter, roadmap, sensitivity)
npm run build      # production build в dist/
npm run preview    # запуск production build на http://localhost:4173
```

## Развертывание

**Vercel** (рекомендуется): импортируйте репо, preset "Vite". Функция `api/explain.ts`
развертывается автоматически. Опциональные переменные окружения для AI слоя:

```
GOOGLE_AI_KEY=your_key_from_aistudio.google.com
```

**Получить бесплатный API ключ Google AI Studio:**
1. Перейти на https://aistudio.google.com/app/apikey
2. Создать новый API ключ
3. Скопировать в `.env` как `GOOGLE_AI_KEY=...`

**Любой статический хост** (GitHub Pages, Netlify, nginx): запустить `npm run build` и подать `dist/`.
`HashRouter` значит rewrite rules не нужны. AI endpoint просто отсутствует и используются
шаблонные объяснения.

## Структура проекта

```
├─ api/explain.ts              # единственный backend endpoint (объяснения из ИИ с fallback)
├─ src/
│  ├─ lib/i18n.ts              # система локализации (РУ, EN)
│  ├─ data/                    # вузы / программы / источники / диагностика / шаблоны дорожной карты
│  ├─ lib/                     # типы, хранилище, формат, объяснения + fallback, демо профили
│  ├─ features/
│  │  ├─ matching/             # фильтр, скоринг, рекомендации (+ suggestions)
│  │  ├─ diagnosis/            # детерминированный engine диагностики
│  │  ├─ roadmap/              # построитель дорожной карты
│  │  └─ progress/             # прогресс + следующее действие
│  ├─ ui/                      # дизайн-система (примитивы + лейауты)
│  ├─ screens/                 # Landing, Profile, Diagnosis, Recommendations, Comparison, Roadmap, Sources
│  ├─ state/AppState.tsx       # reducer + context + производные recommendations/roadmap/progress
│  └─ styles/                  # tokens.css + app.css (из Stitch дизайн-системы)
└─ tests/                      # scoring / filter / roadmap / sensitivity
```

## Честность данных

Каждая программа/дедлайн несет `sourceIds`. Дедлайны помечены `isDemo: true` и показываются
с бейджем **демо-данные**; экран Sources четко говорит что числовые значения демонстрационные
и дает ссылки на официальные сайты для проверки перед подачей. См. `docs/DATA_SOURCES.md`.

## Документация

- `docs/ARCHITECTURE.md` — полная архитектура и инженерный план
- `docs/architecture.html` — то же самое, в читаемом виде
- `docs/DATA_SOURCES.md` — политика данных/источников и чек-лист перед защитой
- `docs/DEMO_SCRIPT.md` — сценарий демо на 2–3 минуты
- `docs/DESIGN.md` — Google Stitch дизайн-система

## Локализация (i18n)

Приложение поддерживает **Русский** (по умолчанию) и **English**. Переключение языка в левом верхнем углу LandingScreen.

```typescript
// Использование переводов в компонентах:
import { t } from '../lib/i18n'

const landing = t('landing')  // { title, subtitle, description, start, demo, ... }
const fields = t('fields')    // { cs: 'Информатика', engineering: 'Инженерия', ... }
```

Все переводы хранятся в `src/lib/i18n.ts`. Добавить новый язык легко:
1. Добавить язык в `type Language`
2. Добавить объект переводов в `translations` объект
3. Функции `setLanguage()` и `getLanguage()` автоматически кэшируют выбор в localStorage
