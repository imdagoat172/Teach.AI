import { useMemo, useState } from 'react'

const typeMeta = {
  Mechanic: { icon: '[]', label: 'Mechanic' },
  Mistake: { icon: '!!', label: 'Mistake' },
  Scenario: { icon: '>>', label: 'Scenario' },
  'Myth-Bust': { icon: '??', label: 'Myth-Bust' },
  Action: { icon: '++', label: 'Action' },
}

const completionForTopic = (progress, topic) => {
  const saved = progress[topic.id] || { coreRead: false, followUpsRead: {} }
  const readFollowUps = Object.values(saved.followUpsRead || {}).filter(Boolean).length
  const done = (saved.coreRead ? 1 : 0) + readFollowUps
  return {
    readFollowUps,
    done,
    total: 6,
    percent: Math.round((done / 6) * 100),
  }
}

export default function LessonLibrary({ modules, progress, setProgress, deepLink, onQuickRecheck }) {
  const initialModule =
    (deepLink?.moduleId && modules.find((item) => item.moduleId === deepLink.moduleId)) ||
    modules[0]
  const initialTopic =
    (deepLink?.topicId && initialModule.topics.find((topic) => topic.id === deepLink.topicId)) ||
    initialModule.topics[0]

  const [activeModuleId, setActiveModuleId] = useState(initialModule.moduleId)
  const [activeTopicId, setActiveTopicId] = useState(initialTopic.id)
  const [activePane, setActivePane] = useState('core')

  const activeModule = modules.find((module) => module.moduleId === activeModuleId) || modules[0]
  const activeTopic = activeModule.topics.find((topic) => topic.id === activeTopicId) || activeModule.topics[0]

  const moduleProgress = useMemo(() => {
    const rows = modules.map((module) => {
      const possible = module.topics.length * 6
      const completed = module.topics.reduce((sum, topic) => {
        const topicDone = completionForTopic(progress, topic)
        return sum + topicDone.done
      }, 0)

      return {
        moduleId: module.moduleId,
        moduleName: module.moduleName,
        completed,
        possible,
        percent: Math.round((completed / possible) * 100),
      }
    })

    const totalPossible = rows.reduce((sum, row) => sum + row.possible, 0)
    const totalRead = rows.reduce((sum, row) => sum + row.completed, 0)

    return {
      rows,
      overall: Math.round((totalRead / totalPossible) * 100),
    }
  }, [modules, progress])

  const markCoreRead = (topicId) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: {
        coreRead: true,
        followUpsRead: prev[topicId]?.followUpsRead || {},
      },
    }))
  }

  const markFollowUpRead = (topicId, type) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: {
        coreRead: prev[topicId]?.coreRead || false,
        followUpsRead: {
          ...(prev[topicId]?.followUpsRead || {}),
          [type]: true,
        },
      },
    }))
  }

  const topicCompletion = completionForTopic(progress, activeTopic)

  return (
    <section className="lessons-shell">
      <header className="section-head">
        <h2>Lesson Library</h2>
        <p className="mono small">Overall completion: {moduleProgress.overall}%</p>
      </header>

      <div className="module-grid">
        {moduleProgress.rows.map((entry) => (
          <button
            key={entry.moduleId}
            type="button"
            className={`module-chip ${entry.moduleId === activeModuleId ? 'active' : ''}`}
            onClick={() => {
              const module = modules.find((m) => m.moduleId === entry.moduleId)
              setActiveModuleId(entry.moduleId)
              setActiveTopicId(module.topics[0].id)
              setActivePane('core')
            }}
          >
            <span>{entry.moduleName}</span>
            <span className="mono">{entry.percent}%</span>
          </button>
        ))}
      </div>

      <div className="lessons-layout">
        <aside className="topic-list">
          {activeModule.topics.map((topic) => {
            const status = completionForTopic(progress, topic)
            return (
              <button
                key={topic.id}
                type="button"
                className={`topic-chip ${topic.id === activeTopic.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTopicId(topic.id)
                  setActivePane('core')
                }}
              >
                <span>{topic.title}</span>
                <span className="mono small">
                  Core {status.done > 0 ? 'yes' : 'no'} · {status.readFollowUps}/5
                </span>
              </button>
            )
          })}
        </aside>

        <article className="reader-panel">
          <div className="reader-head">
            <h3>{activeTopic.title}</h3>
            <p className="mono small">Completion {topicCompletion.percent}%</p>
          </div>

          <div className="reader-tabs">
            <button
              type="button"
              className={`tab-pill ${activePane === 'core' ? 'active' : ''}`}
              onClick={() => {
                setActivePane('core')
                markCoreRead(activeTopic.id)
              }}
            >
              Core
            </button>
            {activeTopic.followUps.map((item) => (
              <button
                key={item.type}
                type="button"
                className={`tab-pill ${activePane === item.type ? 'active' : ''}`}
                onClick={() => {
                  setActivePane(item.type)
                  markFollowUpRead(activeTopic.id, item.type)
                }}
              >
                <span className="mono">{typeMeta[item.type].icon}</span> {item.type}
              </button>
            ))}
          </div>

          {activePane === 'core' ? (
            <div className="lesson-block" onMouseEnter={() => markCoreRead(activeTopic.id)}>
              <h4>{activeTopic.core.title}</h4>
              <p>{activeTopic.core.body}</p>
            </div>
          ) : (
            activeTopic.followUps
              .filter((item) => item.type === activePane)
              .map((item) => (
                <div key={item.type} className="lesson-block dotted" onMouseEnter={() => markFollowUpRead(activeTopic.id, item.type)}>
                  <p className="mono small">{typeMeta[item.type].label}</p>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              ))
          )}
        </article>
      </div>

      {moduleProgress.rows.find((entry) => entry.moduleId === activeModule.moduleId)?.percent === 100 ? (
        <div className="unlock-row">
          <p className="mono">Quick recheck unlocked for {activeModule.moduleName}</p>
          <button
            type="button"
            className="action-btn"
            onClick={() => onQuickRecheck(activeModule.moduleId)}
          >
            Open Module Study Quiz
          </button>
        </div>
      ) : null}
    </section>
  )
}
