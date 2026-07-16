import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const colorByBand = {
  Advanced: '#2F9E86',
  'On Track': '#C9982F',
  Foundational: '#AD3B34',
}

const getBand = (percent) => {
  if (percent >= 80) return 'Advanced'
  if (percent >= 50) return 'On Track'
  return 'Foundational'
}

export default function GrowthReport({ attempts }) {
  if (!attempts.length) {
    return (
      <section className="growth-shell">
        <h2>Growth Report</h2>
        <p>Complete a diagnostic attempt to start your performance trendline.</p>
      </section>
    )
  }

  const latest = attempts[attempts.length - 1]
  const previous = attempts.length > 1 ? attempts[attempts.length - 2] : null

  const trendData = attempts.map((attempt, index) => ({
    name: `${attempt.quarter} #${index + 1}`,
    composite: attempt.composite,
  }))

  const moduleBars = latest.modules.map((module) => ({
    moduleName: module.moduleName,
    percent: module.percent,
    band: module.band || getBand(module.percent),
  }))

  const strongest = [...moduleBars].sort((a, b) => b.percent - a.percent)[0]
  const focusArea = [...moduleBars].sort((a, b) => a.percent - b.percent)[0]

  const biggestJump = previous
    ? latest.modules
        .map((module) => {
          const prev = previous.modules.find((entry) => entry.moduleId === module.moduleId)
          return {
            moduleName: module.moduleName,
            delta: module.percent - (prev?.percent || 0),
          }
        })
        .sort((a, b) => b.delta - a.delta)[0]
    : null

  const deltaComposite = previous ? latest.composite - previous.composite : null

  return (
    <section className="growth-shell">
      <h2>Growth Report</h2>
      <div className="growth-stats">
        <p className="mono">Latest composite: {latest.composite}%</p>
        <p className="mono">Money level: {latest.moneyLevel.toFixed(1)} / 12.0</p>
        <p className="mono">
          Delta vs previous:{' '}
          {deltaComposite === null ? 'N/A' : `${deltaComposite >= 0 ? '+' : ''}${deltaComposite} pts`}
        </p>
      </div>

      <div className="chart-wrap">
        <h3 className="mono">Composite Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d7d2c6" />
            <XAxis dataKey="name" tick={{ fill: '#182233', fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#182233', fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="composite" stroke="#182233" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-wrap">
        <h3 className="mono">Latest Module Breakdown</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={moduleBars} margin={{ top: 20, right: 16, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d7d2c6" />
            <XAxis dataKey="moduleName" angle={-20} textAnchor="end" interval={0} height={90} tick={{ fill: '#182233', fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#182233', fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="percent" name="Module %">
              {moduleBars.map((entry) => (
                <Cell key={entry.moduleName} fill={colorByBand[entry.band]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="insight-card">
        <p className="mono">Strongest module: {strongest.moduleName} ({strongest.percent}%)</p>
        <p className="mono">
          Biggest jump:{' '}
          {biggestJump ? `${biggestJump.moduleName} (${biggestJump.delta >= 0 ? '+' : ''}${biggestJump.delta})` : 'Need at least two attempts'}
        </p>
        <p className="mono">Focus area: {focusArea.moduleName} ({focusArea.percent}%)</p>
      </div>
    </section>
  )
}
