import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AppStateProvider, useApp } from './state/AppState'
import { BottomNav, TopBar } from './ui/layout'
import { LandingScreen } from './screens/LandingScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { DiagnosisScreen } from './screens/DiagnosisScreen'
import { RecommendationsScreen } from './screens/RecommendationsScreen'
import { ComparisonScreen } from './screens/ComparisonScreen'
import { RoadmapScreen } from './screens/RoadmapScreen'
import { SourcesScreen } from './screens/SourcesScreen'
import { DEMO_ANSWERS, demoProfile } from './lib/demoProfile'
import { runDiagnosis } from './features/diagnosis/diagnosisEngine'

function Shell() {
  const { state, dispatch, readiness, canGo } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [path])

  const go = (p: string) => navigate(p)

  function openDemo() {
    const profile = demoProfile()
    dispatch({ type: 'profile/save', profile })
    const diagnosis = runDiagnosis(DEMO_ANSWERS, profile)
    dispatch({ type: 'diagnosis/save', answers: DEMO_ANSWERS, diagnosis })
    navigate('/recommendations')
  }

  const requireProfile = (node: React.ReactNode) => (state.profile ? node : <Navigate to="/profile" replace />)
  const requireRecommendations = (node: React.ReactNode) =>
    state.profile && canGo('/recommendations') ? node : <Navigate to={state.profile ? '/diagnosis' : '/profile'} replace />

  return (
    <div className="app">
      <TopBar
        path={path}
        onNavigate={go}
        canGo={canGo}
        readiness={readiness}
        aiEnabled={state.aiEnabled}
        onToggleAI={(v) => dispatch({ type: 'ai/toggle', enabled: v })}
      />

      <main className="main">
        <Routes>
          <Route path="/" element={<LandingScreen onStart={() => go('/profile')} onDemo={openDemo} hasProfile={!!state.profile} />} />
          <Route
            path="/profile"
            element={<ProfileScreen initial={state.profile} onSave={(p) => { dispatch({ type: 'profile/save', profile: p }); go('/diagnosis') }} />}
          />
          <Route
            path="/diagnosis"
            element={
              state.profile ? (
                <DiagnosisScreen
                  profile={state.profile}
                  savedAnswers={state.answers}
                  savedDiagnosis={state.diagnosis}
                  onComplete={(answers, diagnosis) => {
                    dispatch({ type: 'diagnosis/save', answers, diagnosis })
                    go('/recommendations')
                  }}
                  onSkip={() => go('/recommendations')}
                  onBack={() => go('/profile')}
                />
              ) : (
                <Navigate to="/profile" replace />
              )
            }
          />
          <Route
            path="/recommendations"
            element={requireProfile(
              <RecommendationsScreen onCompare={() => go('/comparison')} onRoadmap={() => go('/roadmap')} />
            )}
          />
          <Route path="/comparison" element={requireRecommendations(<ComparisonScreen onBack={() => go('/recommendations')} onRoadmap={() => go('/roadmap')} />)} />
          <Route path="/roadmap" element={requireRecommendations(<RoadmapScreen onBack={() => go('/comparison')} onRecommendations={() => go('/recommendations')} />)} />
          <Route path="/sources" element={<SourcesScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {path !== '/sources' && (
          <div style={{ marginTop: 26 }}>
            <button className="btn btn-ghost" onClick={() => go('/sources')}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                verified
              </span>
              Data &amp; sources · methodology
            </button>
          </div>
        )}
      </main>

      <BottomNav path={path} onNavigate={go} canGo={canGo} />
    </div>
  )
}

export default function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </AppStateProvider>
  )
}
