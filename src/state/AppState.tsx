import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import type { Diagnosis, Program, Recommendation, Roadmap, StepStatus, University, UserProfile } from '../lib/types'
import { KEYS, loadJson, saveJson } from '../lib/storage'
import type { AnswerMap } from '../features/diagnosis/diagnosisEngine'
import { PROGRAM_BY_ID, PROGRAMS, ROADMAP_TEMPLATES, UNIVERSITIES, UNIVERSITY_BY_ID } from '../data'
import { recommend } from '../features/matching/recommend'
import { buildRoadmap } from '../features/roadmap/roadmapEngine'
import { computeNextAction, computeProgress, type StatusMap } from '../features/progress/progressStore'

interface State {
  profile: UserProfile | null
  diagnosis: Diagnosis | null
  answers: AnswerMap
  selectedProgramIds: string[]
  statuses: StatusMap
  aiEnabled: boolean
  rankSnapshot: { programId: string; rank: number; score: number }[] | null
}

type Action =
  | { type: 'profile/save'; profile: UserProfile }
  | { type: 'diagnosis/save'; answers: AnswerMap; diagnosis: Diagnosis }
  | { type: 'selection/toggle'; programId: string }
  | { type: 'selection/set'; ids: string[] }
  | { type: 'status/set'; id: string; status: StepStatus }
  | { type: 'statuses/clear' }
  | { type: 'ai/toggle'; enabled: boolean }
  | { type: 'snapshot/set'; snapshot: State['rankSnapshot'] }
  | { type: 'reset' }

const initialState: State = {
  profile: null,
  diagnosis: null,
  answers: {},
  selectedProgramIds: [],
  statuses: {},
  aiEnabled: false,
  rankSnapshot: null
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'profile/save':
      return { ...state, profile: action.profile, statuses: {} }
    case 'diagnosis/save':
      return { ...state, answers: action.answers, diagnosis: action.diagnosis }
    case 'selection/toggle': {
      const has = state.selectedProgramIds.includes(action.programId)
      return {
        ...state,
        selectedProgramIds: has
          ? state.selectedProgramIds.filter((id) => id !== action.programId)
          : [...state.selectedProgramIds, action.programId]
      }
    }
    case 'selection/set':
      return { ...state, selectedProgramIds: action.ids }
    case 'status/set':
      return { ...state, statuses: { ...state.statuses, [action.id]: action.status } }
    case 'statuses/clear':
      return { ...state, statuses: {} }
    case 'ai/toggle':
      return { ...state, aiEnabled: action.enabled }
    case 'snapshot/set':
      return { ...state, rankSnapshot: action.snapshot }
    case 'reset':
      return { ...initialState, aiEnabled: state.aiEnabled }
    default:
      return state
  }
}

interface Ctx {
  state: State
  dispatch: React.Dispatch<Action>
  uniMap: Record<string, University>
  programMap: Record<string, Program>
  recommendations: Recommendation[]
  roadmap: Roadmap | null
  progress: { done: number; total: number; percent: number }
  readiness: number
  canGo: (path: string) => boolean
  nextAction: string
}

const AppContext = createContext<Ctx | null>(null)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const restored: State = {
      ...init,
      profile: loadJson<UserProfile | null>(KEYS.profile, null),
      diagnosis: loadJson<Diagnosis | null>(KEYS.diagnosis, null),
      answers: loadJson<AnswerMap>('answers', {}),
      selectedProgramIds: loadJson<string[]>(KEYS.selected, []),
      statuses: loadJson<StatusMap>(KEYS.statuses, {}),
      aiEnabled: loadJson<boolean>(KEYS.aiEnabled, false)
    }
    return restored
  })

  useEffect(() => {
    saveJson(KEYS.profile, state.profile)
    saveJson(KEYS.diagnosis, state.diagnosis)
    saveJson('answers', state.answers)
    saveJson(KEYS.selected, state.selectedProgramIds)
    saveJson(KEYS.statuses, state.statuses)
    saveJson(KEYS.aiEnabled, state.aiEnabled)
  }, [state])

  const recommendations = useMemo(() => {
    if (!state.profile) return []
    return recommend(state.profile, UNIVERSITY_BY_ID, PROGRAMS).items
  }, [state.profile])

  const roadmap = useMemo(() => {
    if (!state.profile || recommendations.length === 0) return null
    return buildRoadmap({
      profile: state.profile,
      recommendations,
      programMap: PROGRAM_BY_ID,
      uniMap: UNIVERSITY_BY_ID,
      templates: ROADMAP_TEMPLATES
    })
  }, [state.profile, recommendations])

  const progress = useMemo(
    () => (roadmap ? computeProgress(roadmap.items, state.statuses) : { done: 0, total: 0, percent: 0 }),
    [roadmap, state.statuses]
  )

  const nextAction = useMemo(
    () => (roadmap ? computeNextAction(roadmap.items, state.statuses) : ''),
    [roadmap, state.statuses]
  )

  const readiness = useMemo(() => {
    if (!state.profile) return 0
    const profileScore = computeProfileScore(state.profile)
    const roadmapScore = progress.percent
    return Math.round(profileScore * 0.4 + roadmapScore * 0.6)
  }, [state.profile, progress.percent])

  const canGo = useCallback(
    (path: string) => {
      if (path === '/' || path === '/profile' || path === '/diagnosis' || path === '/sources') return true
      return recommendations.length > 0
    },
    [recommendations.length]
  )

  const value: Ctx = {
    state,
    dispatch,
    uniMap: UNIVERSITY_BY_ID,
    programMap: PROGRAM_BY_ID,
    recommendations,
    roadmap,
    progress,
    readiness,
    canGo,
    nextAction
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): Ctx {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppStateProvider')
  return ctx
}

function computeProfileScore(profile: UserProfile): number {
  const checks = [
    !!profile.grade,
    !!profile.graduationYear,
    !!profile.citizenship,
    profile.targetCountries.length > 0,
    profile.budgetUsdPerYear > 0,
    !!profile.field,
    profile.gpa > 0,
    Object.keys(profile.examScores).length > 0
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export { UNIVERSITIES }
