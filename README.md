# Teach AI

Gen Z financial literacy web app that combines adaptive placement, lessons, quizzes, and growth analytics in one connected React experience.

## Stack

- React (hooks only)
- Vite
- Recharts
- localStorage persistence
- Plain CSS (no external UI library)

## Run

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run build
```

## Completed TODO

- [x] Build one connected app with top-level tabs: Diagnostic / Lessons / Study / Growth.
- [x] Create 12 modules and 100 topics in shared data structure.
- [x] Fully author 3 Banking topics with complete quiz + lessons.
- [x] Stub remaining topics with real titles and placeholder lesson copy.
- [x] Implement adaptive diagnostic flow (medium first, then hard/easy branch, 24 total).
- [x] Hide correctness during diagnostic and show only neutral picked state.
- [x] Compute module %, composite score, Money Level, and module band labels.
- [x] Add animated receipt-style diagnostic results screen.
- [x] Deep-link focus area from diagnostic into Study and Lessons.
- [x] Build lesson library module/topic browser with per-topic completion indicators.
- [x] Add lesson reader for core + five fixed follow-up types.
- [x] Persist lesson progress and roll up module + overall completion.
- [x] Unlock quick recheck into Study when a module reaches full lesson completion.
- [x] Build study quiz mode with immediate correctness feedback and explanations.
- [x] Route weak study quiz topics directly into lesson entries.
- [x] Save every diagnostic attempt with date, quarter, composite, Money Level, and module breakdown.
- [x] Build growth report with line chart trend and latest module bar chart.
- [x] Add delta callout and auto-insights (strongest, biggest jump, focus area).
- [x] Apply receipt/bank-statement visual direction with responsive layout and focus states.

## Project Structure

- `src/App.jsx`
- `src/diagnosticData.js`
- `src/lessonData.js`
- `src/components/Diagnostic.jsx`
- `src/components/LessonLibrary.jsx`
- `src/components/StudyQuizzes.jsx`
- `src/components/GrowthReport.jsx`
