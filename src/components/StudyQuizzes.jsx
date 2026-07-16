import { useState } from 'react'

const flattenQuestions = (module) =>
  module.topics.flatMap((topic) => [
    { topicId: topic.id, topicTitle: topic.title, difficulty: 'easy', ...topic.quiz.easy },
    { topicId: topic.id, topicTitle: topic.title, difficulty: 'medium', ...topic.quiz.medium },
    { topicId: topic.id, topicTitle: topic.title, difficulty: 'hard', ...topic.quiz.hard },
  ])

export default function StudyQuizzes({ modules, selectedModuleId, onOpenLesson }) {
  const [activeModuleId, setActiveModuleId] = useState(selectedModuleId || null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [picked, setPicked] = useState(null)

  const module = modules.find((entry) => entry.moduleId === activeModuleId)
  const questions = module ? flattenQuestions(module) : []
  const current = questions[index]

  const isFinished = module && index >= questions.length

  const stats = (() => {
    if (!module) return null

    const byTopic = {}
    module.topics.forEach((topic) => {
      byTopic[topic.id] = {
        title: topic.title,
        earned: 0,
        possible: 0,
      }
    })

    answers.forEach((answer) => {
      byTopic[answer.topicId].possible += answer.weight
      byTopic[answer.topicId].earned += answer.correct ? answer.weight : 0
    })

    const topicStats = Object.entries(byTopic).map(([topicId, entry]) => {
      const percent = entry.possible ? Math.round((entry.earned / entry.possible) * 100) : 0
      return { topicId, ...entry, percent }
    })

    const possible = answers.reduce((sum, answer) => sum + answer.weight, 0)
    const earned = answers.reduce((sum, answer) => sum + (answer.correct ? answer.weight : 0), 0)

    return {
      earned,
      possible,
      percent: possible ? Math.round((earned / possible) * 100) : 0,
      topicStats,
      weakTopics: topicStats.filter((topic) => topic.percent < 50),
    }
  })()

  const handlePick = (choice) => {
    if (!current || picked !== null) return

    const correct = choice === current.correctIndex

    setPicked(choice)
    setAnswers((prev) => [
      ...prev,
      {
        topicId: current.topicId,
        topicTitle: current.topicTitle,
        correct,
        weight: current.weight,
      },
    ])
  }

  const next = () => {
    setIndex((prev) => prev + 1)
    setPicked(null)
  }

  if (!activeModuleId) {
    return (
      <section className="study-shell">
        <h2>Study Quizzes</h2>
        <p className="mono small">Pick a module to run every topic in easy → medium → hard order.</p>
        <div className="module-grid">
          {modules.map((entry) => (
            <button
              type="button"
              key={entry.moduleId}
              className="module-chip"
              onClick={() => setActiveModuleId(entry.moduleId)}
            >
              <span>{entry.moduleName}</span>
              <span className="mono">{entry.topics.length} topics</span>
            </button>
          ))}
        </div>
      </section>
    )
  }

  if (isFinished) {
    return (
      <section className="study-shell">
        <h2>{module.moduleName} Results</h2>
        <p className="mono">
          Score {stats.earned}/{stats.possible} · {stats.percent}%
        </p>
        <div className="line-items">
          {stats.topicStats.map((topic) => (
            <p key={topic.topicId} className="mono">
              {topic.title.padEnd(30, '.')} {String(topic.percent).padStart(3, ' ')}%
            </p>
          ))}
        </div>

        {stats.weakTopics.length ? (
          <div className="weak-callout">
            <p>Weak topics detected. Jump straight to lessons:</p>
            <div className="row-actions">
              {stats.weakTopics.slice(0, 3).map((topic) => (
                <button
                  key={topic.topicId}
                  type="button"
                  className="ghost-btn"
                  onClick={() => onOpenLesson(module.moduleId, topic.topicId)}
                >
                  Open {topic.title}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="row-actions">
          <button
            type="button"
            className="action-btn"
            onClick={() => {
              setIndex(0)
              setAnswers([])
              setPicked(null)
            }}
          >
            Retake Module Quiz
          </button>
          <button type="button" className="ghost-btn" onClick={() => setActiveModuleId(null)}>
            Choose Another Module
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="study-shell">
      <p className="mono small">
        {module.moduleName} · {index + 1}/{questions.length}
      </p>
      <h2>{current.topicTitle}</h2>
      <p className="mono small">Difficulty: {current.difficulty.toUpperCase()}</p>
      <p className="question-text">{current.text}</p>

      <div className="options-list">
        {current.options.map((option, optionIndex) => {
          let state = ''
          if (picked !== null) {
            if (optionIndex === current.correctIndex) state = 'correct'
            if (optionIndex === picked && optionIndex !== current.correctIndex) state = 'wrong'
          }

          return (
            <button
              key={option}
              type="button"
              className={`option-card ${state}`}
              onClick={() => handlePick(optionIndex)}
              disabled={picked !== null}
            >
              <span className="mono option-index">{String.fromCharCode(65 + optionIndex)}</span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>

      {picked !== null ? (
        <div className="feedback-panel">
          <p className={`mono ${picked === current.correctIndex ? 'good' : 'bad'}`}>
            {picked === current.correctIndex ? 'Correct' : 'Not quite'}
          </p>
          <p>{current.explanation}</p>
          <button type="button" className="action-btn" onClick={next}>
            {index === questions.length - 1 ? 'Finish' : 'Next Question'}
          </button>
        </div>
      ) : null}
    </section>
  )
}
