const followUpTypes = ['Mechanic', 'Mistake', 'Scenario', 'Myth-Bust', 'Action']

const moduleBlueprints = [
  {
    moduleId: 'banking-cash',
    moduleName: 'Banking & Cash',
    topics: [
      'Checking Account Basics',
      'Debit vs Credit at Checkout',
      'Overdrafts and Fees',
      'Direct Deposit Setup',
      'Mobile Banking Security',
      'Emergency Fund Starter',
      'Savings Account APY',
      'ATM Networks and Charges',
      'Bank Statements Decoded',
      'Joint Accounts and Boundaries',
    ],
  },
  {
    moduleId: 'credit',
    moduleName: 'Credit',
    topics: [
      'Credit Score Factors',
      'Credit Report Checkup',
      'Credit Utilization Strategy',
      'Secured Cards 101',
      'Interest Grace Periods',
      'Authorized User Risks',
      'Buy Now Pay Later Impact',
      'Hard vs Soft Inquiries',
    ],
  },
  {
    moduleId: 'debt',
    moduleName: 'Debt',
    topics: [
      'Student Loan Basics',
      'Avalanche vs Snowball',
      'Minimum Payment Trap',
      'Debt Collection Rights',
      'Refinancing Tradeoffs',
      'APR vs APY on Debt',
      'Cosigning Consequences',
      'Negotiating Payment Plans',
    ],
  },
  {
    moduleId: 'budgeting',
    moduleName: 'Budgeting',
    topics: [
      '50 30 20 Framework',
      'Zero Based Budgeting',
      'Variable Expense Tracking',
      'Sinking Funds Setup',
      'Paycheck to Paycheck Planning',
      'Needs vs Wants Reality Check',
      'Subscription Audit System',
      'Cash Envelope Method',
      'Irregular Income Budgeting',
      'Budget Review Ritual',
    ],
  },
  {
    moduleId: 'investing',
    moduleName: 'Investing',
    topics: [
      'Compound Interest Power',
      'Index Funds vs Single Stocks',
      'Risk and Diversification',
      'Dollar Cost Averaging',
      'Brokerage Account Basics',
      'ETFs Explained',
      'Fees and Expense Ratios',
      'Time Horizon and Goals',
      'Rebalancing Basics',
      'Market Volatility Mindset',
    ],
  },
  {
    moduleId: 'retirement',
    moduleName: 'Retirement',
    topics: [
      '401k Match Priority',
      'Roth vs Traditional IRA',
      'Vesting Schedules',
      'Retirement Contribution Limits',
      'Catch Up Contributions',
      'Pension Basics',
      'Early Retirement Tradeoffs',
    ],
  },
  {
    moduleId: 'taxes',
    moduleName: 'Taxes',
    topics: [
      'W2 vs 1099 Income',
      'Tax Brackets Explained',
      'Withholding and W4',
      'Standard vs Itemized Deduction',
      'Tax Credits vs Deductions',
      'Filing Status Choices',
      'Quarterly Estimated Taxes',
      'Common Filing Mistakes',
    ],
  },
  {
    moduleId: 'insurance',
    moduleName: 'Insurance',
    topics: [
      'Deductible vs Premium',
      'Health Plan Networks',
      'Auto Coverage Types',
      'Renters Insurance Basics',
      'Disability Insurance Why',
      'Life Insurance Term vs Whole',
      'Claim Filing Process',
      'Emergency Coverage Gaps',
    ],
  },
  {
    moduleId: 'housing',
    moduleName: 'Housing',
    topics: [
      'Renting Lease Essentials',
      'Security Deposit Rules',
      'Roommate Cost Sharing',
      'Mortgage Basics',
      'Fixed vs Variable Rates',
      'Homebuying Closing Costs',
      'Property Tax Planning',
      'Maintenance Budgeting',
    ],
  },
  {
    moduleId: 'income-career',
    moduleName: 'Income & Career',
    topics: [
      'Reading a Pay Stub',
      'Salary vs Hourly Tradeoffs',
      'Negotiation Basics',
      'Side Hustle Taxes',
      'Benefits Total Compensation',
      'Career Capital Building',
      'Emergency Career Fund',
      'Freelance Contract Basics',
    ],
  },
  {
    moduleId: 'scams-safety',
    moduleName: 'Scams & Safety',
    topics: [
      'Phishing Red Flags',
      'Identity Theft Response',
      'Crypto Scam Signals',
      'Fake Job Offer Scams',
      'Romance Scam Warning Signs',
      'Password Manager Habits',
      'Two Factor Authentication',
      'Public WiFi Risks',
    ],
  },
  {
    moduleId: 'money-psychology',
    moduleName: 'Money Psychology',
    topics: [
      'Impulse Spending Triggers',
      'Scarcity Mindset Loops',
      'Social Comparison Spending',
      'Goal Setting That Sticks',
      'Habit Stacking for Saving',
      'Emotional Spending Reset',
      'Values Based Budgeting',
    ],
  },
]

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const makeTopicId = (moduleId, title) => `${moduleId}-${slugify(title)}`

const stubCore = (title) => ({
  title: `${title}: Core Concept`,
  body: `This is a placeholder core lesson for ${title}. Expand this section with 200-400 words covering the main concept, why it matters for real financial decisions, and one practical way a learner can apply it this month. Keep examples clear, age-relevant, and connected to other modules where helpful.`,
})

const stubFollowUps = (title) =>
  followUpTypes.map((type) => ({
    type,
    title: `${title}: ${type}`,
    body: `Placeholder ${type.toLowerCase()} content for ${title}. Replace with a specific worked example, trap, scenario, myth correction, or one-week action step aligned to this lesson type.`,
  }))

const realTopics = {
  'banking-cash-checking-account-basics': {
    core: {
      title: 'Checking Account Basics: Your Money Control Center',
      body: `A checking account is your day-to-day money hub. Income usually lands here first, bills leave from here, and your debit card is connected to it. The goal is not just to store money. It is to create a system where every dollar has a job without you needing to think from scratch every week. Most accounts include a routing number and account number, online bill pay, debit card access, and mobile deposit. What matters most is understanding how cash moves in and out.

Start by dividing your cash flow into three buckets that can all live inside one account: fixed bills, flexible spending, and short-term savings transfers. If your paycheck is inconsistent, build around your lowest normal month, not your best month. Use alerts for low balance, large transactions, and deposits so surprises show up early. Reconcile once a week by matching your app activity to your own notes. That 10-minute habit catches forgotten subscriptions, duplicate charges, and pending card holds before they cause a problem.

Account choice matters too. Compare monthly fee rules, overdraft policy, ATM network, and mobile app quality. A free account with weak fraud tools can cost more than a slightly stricter account that protects you faster. If you are new to managing money solo, choose an account that makes limits and alerts easy to set from your phone. Strong checking habits reduce stress, protect your credit from missed payments, and make every other money goal easier because your base system is stable.`,
    },
    followUps: [
      {
        type: 'Mechanic',
        title: 'Mechanic: Build a Weekly Checking Sweep',
        body: `Example: You get paid $650 on Friday. Immediately transfer $250 to a bills sub-bucket, leave $300 for variable spending, and move $100 to emergency savings. Set your bank app to alert you if available balance drops under $120. On Wednesday, open your transaction list and tag each purchase as food, transport, or extras. If extras hit the cap early, pause extras until the next pay cycle. This simple sweep turns random spending into repeatable control.`,
      },
      {
        type: 'Mistake',
        title: 'Mistake: Treating Available Balance as Spendable Balance',
        body: `Common trap: seeing $400 available and spending like all $400 is free. Pending charges, autopays, and delayed deposits can make that number temporary. Use your own tracker for committed money, not the bank's snapshot alone. Keep a small buffer in checking so timing delays do not trigger overdrafts or panic transfers.`,
      },
      {
        type: 'Scenario',
        title: 'Scenario: Splitting Rent and Groceries with a Roommate',
        body: `You and a roommate share a $1,600 rent payment and rotate grocery runs. Use one shared note with due dates and exact amounts. Two days before rent, confirm both halves are in checking. For groceries, settle every Sunday with a transfer app and move your own share from flexible spending to avoid accidental bill money bleed. The checking account works best when shared costs are reconciled weekly, not monthly.`,
      },
      {
        type: 'Myth-Bust',
        title: 'Myth-Bust: More Accounts Always Means Better Money Management',
        body: `Not always. More accounts can help with organization, but too many can hide cash and create transfer friction. The real win is clarity: you should be able to explain where your next 30 days of spending money is in under one minute. Start simple, then add accounts only when your current setup creates recurring mistakes.`,
      },
      {
        type: 'Action',
        title: 'Action: Configure Three Alerts in 10 Minutes',
        body: `This week, open your banking app and turn on alerts for low balance, deposits, and transactions over a chosen amount (for example $40). Then write one sentence in your notes app: "Bills money is not spending money." Read it before checkout for seven days.`,
      },
    ],
  },
  'banking-cash-overdrafts-and-fees': {
    core: {
      title: 'Overdrafts and Fees: Pay Attention to Timing, Not Just Amounts',
      body: `Overdraft happens when more money leaves your account than is available. Many people think overdrafts only come from huge purchases, but most overdrafts are timing mistakes. A subscription renews early, a gas station places a temporary hold, or a transfer arrives later than expected. If your account dips negative, you might pay a fee, trigger multiple returned payment charges, or miss an important bill.

Banks handle this differently. Some decline transactions with no fee. Others allow the payment and charge overdraft fees. You can often choose whether debit card purchases are allowed to overdraft, but ACH payments like utilities may still process differently. Read your account policy and set your preference intentionally. If your bank offers grace periods, low-balance buffers, or fee-free overdraft transfer from savings, use them. Those tools exist to prevent one mistake from becoming a chain reaction.

The best prevention system is a calendar-plus-buffer approach. Keep a list of all autopays by date, check it each payday, and maintain a cushion that is never touched for normal spending. Even a $50-$100 buffer can block multiple fees in one month. If you do overdraft, act fast: deposit funds immediately, request a courtesy reversal if this is rare, and update your system so the same trigger does not repeat. Avoiding overdraft is less about perfection and more about designing for real life timing glitches.`,
    },
    followUps: [
      {
        type: 'Mechanic',
        title: 'Mechanic: Overdraft Risk Check in 5 Steps',
        body: `List every autopay date in your phone calendar. Two days before each date, compare expected balance after that payment. If projected balance is below your safety floor (say $80), move money from flexible spending immediately. After payday, restore the floor first, then spend the rest. This keeps autopays from colliding with random purchases.`,
      },
      {
        type: 'Mistake',
        title: 'Mistake: Ignoring Small Subscription Charges',
        body: `A $6 app renewal feels harmless, but small charges can stack on low-balance days and trigger overdrafts. Review recurring payments monthly and cancel at least one low-value service. The fee you avoid can be larger than the subscription itself.`,
      },
      {
        type: 'Scenario',
        title: 'Scenario: Weekend Spending Before Monday Bills',
        body: `You spend freely on Saturday because payday hit Friday, then forget that rent insurance and phone autopay run Monday morning. By Sunday night, move enough money into your protected bills bucket and stop discretionary card swipes. Timing correction on Sunday prevents Monday fee drama.`,
      },
      {
        type: 'Myth-Bust',
        title: 'Myth-Bust: Overdraft Is Just a Normal Cost of Banking',
        body: `It should not be. Overdraft fees are preventable in most cases with alerts, buffers, and autopay mapping. Treat each fee as a system bug report. Find the trigger and patch it.`,
      },
      {
        type: 'Action',
        title: 'Action: Create a No-Touch Buffer Rule',
        body: `Pick a non-negotiable checking floor today (for example $75). Put that number in your banking app nickname or account note. For one week, do not let available balance drop below it unless it is a true emergency.`,
      },
    ],
  },
  'banking-cash-emergency-fund-starter': {
    core: {
      title: 'Emergency Fund Starter: Build Shock Absorbers Before Investing Hype',
      body: `An emergency fund is cash set aside for urgent, non-optional costs: medical bills, car repairs, sudden travel, unexpected job gaps, or replacing essentials after a loss. It is not for concerts, trend buys, or planned gifts. Think of it as financial suspension. It does not make the road smooth, but it stops every bump from damaging your whole system.

For beginners, the first milestone is not three months of expenses overnight. Start with a micro-target you can hit fast, like $250 or one week of core costs. Early wins are powerful because they prove your system can produce cash reserves consistently. Keep this money in a high-yield savings account linked to checking, but separate enough that you do not swipe it accidentally.

Automate contributions right after each paycheck, even if the amount is small. A consistent $20 transfer beats occasional big intentions. When an emergency happens, use the fund for the urgent cost, then switch into refill mode immediately by trimming optional spending until the balance recovers. Over time, grow from starter target to one month of core expenses, then beyond. Emergency savings lowers financial anxiety, reduces reliance on high-interest debt, and gives you decision space when life gets chaotic. It is one of the highest-impact habits for long-term stability.`,
    },
    followUps: [
      {
        type: 'Mechanic',
        title: 'Mechanic: Starter Fund Math in 3 Numbers',
        body: `Pick your target (example $300), your deadline (10 weeks), and your automatic weekly transfer ($30). Name your savings account "Emergency Only" and schedule transfers for payday. If you receive surprise income, split it: half to emergency fund, half to current priorities.`,
      },
      {
        type: 'Mistake',
        title: 'Mistake: Keeping Emergency Cash in Checking',
        body: `If emergency money sits in checking, it usually gets spent on convenience purchases. Keep it in separate savings with no debit card attached. Distance creates better decisions.`,
      },
      {
        type: 'Scenario',
        title: 'Scenario: Flat Tire the Week Before Rent',
        body: `A $160 tire replacement lands four days before rent. Without emergency savings, you might miss rent or run card debt. With a starter fund, you pay the repair from savings, then refill over the next month by pausing optional delivery spending.`,
      },
      {
        type: 'Myth-Bust',
        title: 'Myth-Bust: Emergency Funds Are Only for People with High Income',
        body: `No. Emergency funds matter most when margins are tight. Small, regular deposits create resilience regardless of income level. The habit is more important than the starting amount.`,
      },
      {
        type: 'Action',
        title: 'Action: Open and Name the Account Today',
        body: `This week, open a separate savings account and set one automatic transfer, even if it is only $10. Then write your first emergency rule: "I only use this for urgent, unplanned essentials."`,
      },
    ],
  },
}

const withTopicIds = moduleBlueprints.map((module) => ({
  ...module,
  topics: module.topics.map((title) => ({
    id: makeTopicId(module.moduleId, title),
    title,
  })),
}))

export const lessonModules = withTopicIds.map((module) => ({
  moduleId: module.moduleId,
  moduleName: module.moduleName,
  topics: module.topics.map((topic) => {
    const real = realTopics[topic.id]
    if (real) {
      return {
        ...topic,
        core: real.core,
        followUps: real.followUps,
      }
    }

    return {
      ...topic,
      core: stubCore(topic.title),
      followUps: stubFollowUps(topic.title),
    }
  }),
}))

export const moduleTopicCount = lessonModules.reduce(
  (count, module) => count + module.topics.length,
  0,
)
