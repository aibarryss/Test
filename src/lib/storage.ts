const PREFIX = 'pathly:'

export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* storage full or unavailable — the app keeps working in memory */
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    /* ignore */
  }
}

export const KEYS = {
  profile: 'profile',
  diagnosis: 'diagnosis',
  statuses: 'statuses',
  roadmapId: 'roadmap-id',
  selected: 'selected-programs',
  aiEnabled: 'ai-enabled'
} as const
