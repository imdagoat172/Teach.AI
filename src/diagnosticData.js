import { lessonModules } from './lessonData'

const detailedQuiz = {
  'banking-cash-checking-account-basics': {
    easy: {
      text: 'What is the main purpose of a checking account?',
      options: [
        'Long-term retirement investing',
        'Daily spending, bill payments, and receiving income',
        'Avoiding all bank fees forever',
        'Locking money for five years',
      ],
      correctIndex: 1,
      weight: 1,
      explanation:
        'Checking accounts are designed for everyday cash flow, not long-term locked savings or investing.',
    },
    medium: {
      text: 'Which setup best protects your bill money inside one checking system?',
      options: [
        'Spend first, then see what is left at month-end',
        'Use one running balance and rely on memory',
        'Separate fixed bills, flexible spending, and short-term transfers with alerts',
        'Keep all money as cash at home',
      ],
      correctIndex: 2,
      weight: 2,
      explanation:
        'Labeling money by job plus alerts prevents accidental crossover between bills and spending.',
    },
    hard: {
      text: 'Your app shows $420 available, but $180 rent autopay and $70 pending gas hold are not settled. What is the safest spendable estimate right now?',
      options: ['$420', '$350', '$170', '$250'],
      correctIndex: 2,
      weight: 3,
      explanation:
        'Subtract committed and pending amounts first: $420 - $180 - $70 = $170 realistically spendable.',
    },
  },
  'banking-cash-overdrafts-and-fees': {
    easy: {
      text: 'Overdraft usually means:',
      options: [
        'Your savings account earned interest',
        'More money left your account than was available',
        'Your card was upgraded automatically',
        'Your credit score increased',
      ],
      correctIndex: 1,
      weight: 1,
      explanation:
        'Overdraft is a negative balance event, often caused by transaction timing or low buffers.',
    },
    medium: {
      text: 'Which behavior most reduces overdraft risk on autopay-heavy accounts?',
      options: [
        'Turning off all notifications',
        'Tracking autopay dates and keeping a no-touch checking buffer',
        'Paying everything in cash only',
        'Using credit cards for every purchase regardless of budget',
      ],
      correctIndex: 1,
      weight: 2,
      explanation:
        'Date mapping and a consistent floor balance are the strongest practical protections.',
    },
    hard: {
      text: 'A $12 subscription renews, then a $35 fee posts, and a second payment bounces with a $25 penalty. What does this show?',
      options: [
        'Small charges cannot trigger major costs',
        'Fee chains can make a tiny timing miss expensive',
        'Only large debit purchases create fees',
        'Banks must reverse all fees automatically',
      ],
      correctIndex: 1,
      weight: 3,
      explanation:
        'Overdraft cascades happen when one small charge triggers multiple follow-on penalties.',
    },
  },
  'banking-cash-emergency-fund-starter': {
    easy: {
      text: 'An emergency fund is best used for:',
      options: [
        'Limited-time shopping drops',
        'Urgent, unplanned essentials like repairs or medical costs',
        'Daily coffee and snacks',
        'Vacation upgrades',
      ],
      correctIndex: 1,
      weight: 1,
      explanation:
        'Emergency funds are for true disruptions, not planned or optional spending.',
    },
    medium: {
      text: 'What is the smartest first milestone for someone starting from zero savings?',
      options: [
        'Wait until you can save three full months at once',
        'Start with a reachable starter target and automate small deposits',
        'Borrow to create an emergency fund instantly',
        'Invest first and skip liquid savings entirely',
      ],
      correctIndex: 1,
      weight: 2,
      explanation:
        'Small, consistent automation builds behavior and resilience faster than waiting for perfect conditions.',
    },
    hard: {
      text: 'If your starter target is $300 and a $180 car repair happens at $260 saved, what is the strongest next move?',
      options: [
        'Stop saving because emergencies are unavoidable',
        'Use credit only and leave savings untouched forever',
        'Use emergency savings for the repair and immediately begin refill transfers',
        'Spend remaining savings on non-essentials before rebuilding',
      ],
      correctIndex: 2,
      weight: 3,
      explanation:
        'Emergency funds are meant to be used and then replenished quickly through a refill plan.',
    },
  },
}

const genericQuiz = (title) => ({
  easy: {
    text: `Which statement best fits the topic "${title}"?`,
    options: [
      'Small money decisions never add up over time',
      'This topic helps improve everyday financial choices',
      'Financial systems are random and cannot be planned',
      'Only experts can use this concept',
    ],
    correctIndex: 1,
    weight: 1,
    explanation:
      'Core financial topics are useful because they improve consistent day-to-day decision quality.',
  },
  medium: {
    text: `When applying "${title}", what is usually strongest?`,
    options: [
      'Reacting only after problems appear',
      'Building a repeatable plan and reviewing outcomes regularly',
      'Copying what friends do without checking your numbers',
      'Ignoring tradeoffs because they are uncomfortable',
    ],
    correctIndex: 1,
    weight: 2,
    explanation:
      'A repeatable process with review loops produces better results than one-off reactions.',
  },
  hard: {
    text: `What is the most advanced mindset for "${title}"?`,
    options: [
      'Optimize for short-term comfort only',
      'Use systems that protect downside while compounding upside decisions',
      'Assume one strategy works forever in all conditions',
      'Avoid tracking so you feel less stressed',
    ],
    correctIndex: 1,
    weight: 3,
    explanation:
      'Strong money management combines protection against losses with long-term growth behavior.',
  },
})

export const diagnosticModules = lessonModules.map((module) => ({
  moduleId: module.moduleId,
  moduleName: module.moduleName,
  topics: module.topics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    quiz: detailedQuiz[topic.id] || genericQuiz(topic.title),
  })),
}))
