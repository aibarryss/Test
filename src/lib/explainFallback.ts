import type {
  Program,
  Recommendation,
  RecommendationExplanation,
  ScoreFactor,
  University
} from './types'
import { formatUsd } from './format'
import { getLanguage } from './i18n'

function strongest(factors: ScoreFactor[], n: number): ScoreFactor[] {
  return [...factors]
    .filter((f) => f.known)
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, n)
}

function weakest(factors: ScoreFactor[]): ScoreFactor | undefined {
  return [...factors].filter((f) => f.known).sort((a, b) => a.normalized - b.normalized)[0]
}

/**
 * Deterministic, always-available explanation built purely from the score
 * breakdown. This is what the jury sees when AI is unavailable — the product
 * never depends on the model to say something meaningful.
 */
export function fallbackExplanation(
  rec: Recommendation,
  program: Program | undefined,
  uni: University | undefined
): RecommendationExplanation {
  const lang = getLanguage()
  const name = program?.name ?? (lang === 'ru' ? 'Эта программа' : 'This program')
  const school = uni?.name ?? (lang === 'ru' ? 'университет' : 'the university')

  const top = strongest(rec.breakdown, 2)
  const reasons = top.map((f) => `${f.label.toLowerCase()} (${Math.round(f.normalized * 100)}%)`)
  const hook = program ? `${name} в ${school}` : name

  let whyItFits: string
  if (lang === 'ru') {
    whyItFits = program
      ? `${hook} набирает ${rec.score}% соответствия вашему профилю. Главные факторы: ${reasons.join(' и ')}. Стоимость обучения ${formatUsd(program.netTuitionUsdPerYear)} в год.`
      : `${hook} набирает ${rec.score}% соответствия вашему профилю благодаря ${reasons.join(' и ')}.`
  } else {
    whyItFits = program
      ? `${hook} scores ${rec.score}% for your profile. Strongest drivers: ${reasons.join(' and ')}. Net tuition is ${formatUsd(program.netTuitionUsdPerYear)} per year.`
      : `${hook} scores ${rec.score}% for your profile, driven by ${reasons.join(' and ')}.`
  }

  const concerns: string[] = [...rec.warnings].slice(0, 3)
  if (concerns.length === 0) {
    const weak = weakest(rec.breakdown)
    if (weak && weak.normalized < 0.9) {
      if (lang === 'ru') {
        concerns.push(`${weak.label} — самый слабый фактор здесь (${Math.round(weak.normalized * 100)}%)`)
      } else {
        concerns.push(`${weak.label} is the softest factor here (${Math.round(weak.normalized * 100)}%)`)
      }
    }
  }
  if (rec.confidence !== 'high') {
    if (lang === 'ru') {
      concerns.push('Некоторые данные профиля отсутствуют, поэтому это совпадение менее надежно')
    } else {
      concerns.push('Some profile fields are missing, so this match has lower confidence')
    }
  }

  const weak = weakest(rec.breakdown)
  let nextStepHint: string
  if (lang === 'ru') {
    nextStepHint = 'Откройте дорожную карту и начните с выделенного действия.'
    if (weak?.key === 'academic') nextStepHint = 'Зарегистрируйтесь на экзамен — это главное препятствие для этого варианта.'
    else if (weak?.key === 'budget') nextStepHint = 'Проверьте возможность получения стипендии до дедлайна финансирования.'
    else if (weak?.key === 'language') nextStepHint = 'Уточните язык обучения и подтвердите ваш уровень владения языком.'
    else if (weak?.key === 'deadline') nextStepHint = 'Проверьте точный дедлайн подачи заявления и начните собирать документы.'
  } else {
    nextStepHint = 'Open the roadmap and start with the highlighted next action.'
    if (weak?.key === 'academic') nextStepHint = 'Book your next exam date — it is the main blocker for this option.'
    else if (weak?.key === 'budget') nextStepHint = 'Check the scholarship route for this program before the funding deadline.'
    else if (weak?.key === 'language') nextStepHint = 'Confirm the teaching language and your language evidence.'
    else if (weak?.key === 'deadline') nextStepHint = 'Check the exact application deadline and start documents now.'
  }

  return { whyItFits, concerns: concerns.slice(0, 3), nextStepHint, origin: 'fallback' }
}
