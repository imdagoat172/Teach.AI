import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { diagnosticModules } from './diagnosticData'
import { lessonModules, moduleTopicCount } from './lessonData'
import Diagnostic from './components/Diagnostic'
import LessonLibrary from './components/LessonLibrary'
import StudyQuizzes from './components/StudyQuizzes'
import GrowthReport from './components/GrowthReport'

const ATTEMPTS_KEY = 'teach-ai-attempts'
const LESSON_PROGRESS_KEY = 'teach-ai-lesson-progress'

const tabs = [
  { id: 'diagnostic', label: 'Diagnostic' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'study', label: 'Study' },
  { id: 'growth', label: 'Growth' },
]

const loadStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('diagnostic')
  const [diagnosticAttempts, setDiagnosticAttempts] = useState(() =>
    loadStorage(ATTEMPTS_KEY, []),
  )
  const [lessonProgress, setLessonProgress] = useState(() =>
    loadStorage(LESSON_PROGRESS_KEY, {}),
  )
  const [studyModuleDeepLink, setStudyModuleDeepLink] = useState(null)
  const [lessonDeepLink, setLessonDeepLink] = useState(null)

  useEffect(() => {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(diagnosticAttempts))
  }, [diagnosticAttempts])

  useEffect(() => {
    localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(lessonProgress))
  }, [lessonProgress])

  const combinedModules = useMemo(
    () =>
      lessonModules.map((lessonModule) => {
        const quizModule = diagnosticModules.find(
          (entry) => entry.moduleId === lessonModule.moduleId,
        )

        return {
          moduleId: lessonModule.moduleId,
          moduleName: lessonModule.moduleName,
          topics: lessonModule.topics.map((lessonTopic) => {
            const quizTopic = quizModule.topics.find((topic) => topic.id === lessonTopic.id)
            return {
              ...lessonTopic,
              quiz: quizTopic.quiz,
            }
          }),
        }
      }),
    [],
  )

  const renderActiveTab = () => {
    if (activeTab === 'diagnostic') {
      return (
        <Diagnostic
          modules={combinedModules}
          attemptCount={diagnosticAttempts.length}
          onSaveAttempt={(attempt) => setDiagnosticAttempts((prev) => [...prev, attempt])}
          onDeepLink={({ moduleId, target }) => {
            if (target === 'study') {
              setStudyModuleDeepLink(moduleId)
              setActiveTab('study')
            }

            if (target === 'lessons') {
              setLessonDeepLink({ moduleId })
              setActiveTab('lessons')
            }
          }}
        />
      )
    }

    if (activeTab === 'lessons') {
      return (
        <LessonLibrary
          key={lessonDeepLink ? `${lessonDeepLink.moduleId}-${lessonDeepLink.topicId || 'module'}` : 'lessons-default'}
          modules={combinedModules}
          progress={lessonProgress}
          setProgress={setLessonProgress}
          deepLink={lessonDeepLink}
          onQuickRecheck={(moduleId) => {
            setStudyModuleDeepLink(moduleId)
            setActiveTab('study')
          }}
        />
      )
    }

    if (activeTab === 'study') {
      return (
        <StudyQuizzes
          key={studyModuleDeepLink || 'study-default'}
          modules={combinedModules}
          selectedModuleId={studyModuleDeepLink}
          onOpenLesson={(moduleId, topicId) => {
            setLessonDeepLink({ moduleId, topicId })
            setActiveTab('lessons')
          }}
        />
      )
    }

    return <GrowthReport attempts={diagnosticAttempts} />
  }

  return (
    <main className="app-shell">
      <header className="hero-head">
        <p className="mono small">Teach AI · Financial Literacy Platform</p>
        <h1>Statement Mode Learning for Money Skills</h1>
        <p>
          12 modules · {moduleTopicCount} topics · adaptive placement, lessons, study quizzes,
          and growth trends in one connected experience.
        </p>
      </header>

      <nav className="top-nav" aria-label="Primary">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {renderActiveTab()}
    </main>
  )
}

export default App
