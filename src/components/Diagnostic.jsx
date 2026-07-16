import { useMemo, useState } from 'react'

const bandFromPercent = (value) => {
  if (value >= 80) return 'Advanced'
  if (value >= 50) return 'On Track'
  return 'Foundational'
}

const quarterLabel = (date) => {
  const month = date.getMonth()
  const quarter = Math.floor(month / 3) + 1
  return `Q${quarter} ${date.getFullYear()}`
}

const compileSummary = (modules, moduleResults) => {
  const list = modules.map((module) => {
    const record = moduleResults[module.moduleId] || { earned: 0, possible: 0 }
    const percent = record.possible ? Math.round((record.earned / record.possible) * 100) : 0
    return {
      moduleId: module.moduleId,
      moduleName: module.moduleName,
      earned: record.earned,
      possible: record.possible,
      percent,
      band: bandFromPercent(percent),
    }
  })

  const composite = Math.round(
    list.reduce((sum, module) => sum + module.percent, 0) / list.length,
  )
  const moneyLevel = Number(((composite / 100) * 12).toFixed(1))

  return {
    modules: list,
    composite,
    moneyLevel,
    weakest: [...list].sort((a, b) => a.percent - b.percent)[0],
  }
}

export default function Diagnostic({ modules, attemptCount, onSaveAttempt, onDeepLink }) {
  const [started, setStarted] = useState(false)
  const [moduleIndex, setModuleIndex] = useState(0)
  const [phase, setPhase] = useState('medium')
  const [selectedOption, setSelectedOption] = useState(null)
  const [isLocked, setIsLocked] = useState(false)
  const [moduleResults, setModuleResults] = useState({})
  const [selectedTopics] = useState(() =>
    modules.map((module) => {
      const topicIndex = attemptCount % module.topics.length
      return module.topics[topicIndex]
    }),
  )

  const isDone = started && moduleIndex >= modules.length

  const currentModule = !isDone ? modules[moduleIndex] : null
  const currentTopic = !isDone ? selectedTopics[moduleIndex] : null
  const currentQuestion = !isDone ? currentTopic.quiz[phase] : null

  const questionNumber = moduleIndex * 2 + (phase === 'medium' ? 1 : 2)

  const compiledResults = useMemo(() => compileSummary(modules, moduleResults), [modules, moduleResults])

  const handlePick = (index) => {
    if (isLocked || isDone) return

    const isCorrect = index === currentQuestion.correctIndex

    setSelectedOption(index)
    setIsLocked(true)

    setTimeout(() => {
      setModuleResults((prev) => {
        const existing = prev[currentModule.moduleId] || { earned: 0, possible: 0 }
        const updated = {
          earned: existing.earned + (isCorrect ? currentQuestion.weight : 0),
          possible: existing.possible + currentQuestion.weight,
        }

        const nextResults = {
          ...prev,
          [currentModule.moduleId]: updated,
        }

        if (phase !== 'medium' && moduleIndex + 1 === modules.length) {
          const now = new Date()
          const summary = compileSummary(modules, nextResults)
          onSaveAttempt({
            date: now.toISOString(),
            quarter: quarterLabel(now),
            composite: summary.composite,
            moneyLevel: summary.moneyLevel,
            modules: summary.modules,
          })
        }

        return nextResults
      })

      if (phase === 'medium') {
        setPhase(isCorrect ? 'hard' : 'easy')
      } else {
        const nextModuleIndex = moduleIndex + 1
        setModuleIndex(nextModuleIndex)
        setPhase('medium')
      }

      setSelectedOption(null)
      setIsLocked(false)
    }, 650)
  }

  const handleStart = () => {
    setStarted(true)
    setModuleIndex(0)
    setPhase('medium')
    setSelectedOption(null)
    setIsLocked(false)
    setModuleResults({})
  }

  const handleRetake = () => {
    handleStart()
  }

  const receiptLines = [
    `MONEY LEVEL  ............ ${compiledResults.moneyLevel.toFixed(1)} / 12.0`,
    `COMPOSITE SCORE  ........ ${compiledResults.composite}%`,
    '----------------------------------------',
    ...compiledResults.modules.map(
      (entry) => `${entry.moduleName.padEnd(20, '.')} ${String(entry.percent).padStart(3, ' ')}% ${entry.band}`,
    ),
  ]

  if (!started) {
    return (
      <section className="diagnostic-shell">
        <h2>Adaptive Diagnostic</h2>
        <p className="mono small">
          24 questions total. Every module starts at medium, then branches up or down.
        </p>
        <button type="button" className="action-btn" onClick={handleStart}>
          Start Placement Test
        </button>
      </section>
    )
  }

  if (isDone) {
    return (
      <section className="diagnostic-shell">
        <h2>Placement Receipt</h2>
        <div className="receipt-card" role="status" aria-live="polite">
          {receiptLines.map((line, index) => (
            <p
              key={line}
              className="receipt-line mono"
              style={{ animationDelay: `${index * 0.18}s` }}
            >
              {line}
            </p>
          ))}
        </div>
        <p className="small">
          Focus area: <strong>{compiledResults.weakest.moduleName}</strong>
        </p>
        <div className="row-actions">
          <button
            type="button"
            className="action-btn"
            onClick={() =>
              onDeepLink({
                moduleId: compiledResults.weakest.moduleId,
                target: 'study',
              })
            }
          >
            Practice Focus Area
          </button>
          <button
            type="button"
            className="ghost-btn"
            onClick={() =>
              onDeepLink({
                moduleId: compiledResults.weakest.moduleId,
                target: 'lessons',
              })
            }
          >
            Open Focus Lessons
          </button>
          <button
            type="button"
            className="ghost-btn"
            onClick={handleRetake}
          >
            Retake
          </button>
        </div>
        <button type="button" className="action-btn" onClick={() => setStarted(false)}>
          Done
        </button>
      </section>
    )
  }

  return (
    <section className="diagnostic-shell">
      <p className="mono small">
        Question {questionNumber}/24 · {currentModule.moduleName}
      </p>
      <h2>{currentTopic.title}</h2>
      <p className="question-text">{currentQuestion.text}</p>
      <div className="options-list">
        {currentQuestion.options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={`option-card ${selectedOption === index ? 'picked' : ''}`}
            onClick={() => handlePick(index)}
            disabled={isLocked}
          >
            <span className="mono option-index">{String.fromCharCode(65 + index)}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>
      <p className="small">Placement mode hides correctness until your receipt is printed.</p>
    </section>
  )
}
