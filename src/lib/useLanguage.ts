import { useSyncExternalStore } from 'react'
import { getLanguage, subscribeLanguage, type Language } from './i18n'

/**
 * Active language as a React subscription. Switching the language through
 * `setLanguage` re-renders every component that reads translations, without a
 * full page reload.
 */
export function useLanguage(): Language {
  return useSyncExternalStore(subscribeLanguage, getLanguage, () => 'ru')
}
