export interface NextStep {
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium';
  timeframe: string;
}

export const STAGE_NEXT_STEPS: Record<number, NextStep[]> = {
  // Stage 1: Buried in Debt (0-5 points)
  1: [
    {
      title: "Stop the bleeding - List all debts and minimum payments",
      description: "Write down every debt, its balance, minimum payment, and due date. This gives you a clear picture of what you're dealing with.",
      priority: 'urgent',
      timeframe: "Today"
    },
    {
      title: "Create a survival budget focused on essentials",
      description: "Track only four categories: housing, utilities, food, and transportation. Cut everything else temporarily until you're stable.",
      priority: 'urgent',
      timeframe: "This week"
    },
    {
      title: "Contact creditors to negotiate payment plans",
      description: "Call each creditor to explain your situation. Many offer hardship programs with reduced payments or interest rates.",
      priority: 'urgent',
      timeframe: "Within 3 days"
    },
    {
      title: "Find quick income boosts",
      description: "Sell unused items, take on gig work, or ask for overtime. Every extra dollar goes toward catching up on payments.",
      priority: 'high',
      timeframe: "This week"
    },
    {
      title: "Stop using credit cards completely",
      description: "Put cards in a drawer or freeze them in ice. Using cash only will prevent your debt from growing while you stabilize.",
      priority: 'urgent',
      timeframe: "Immediately"
    }
  ],

  // Stage 2: Stabilizing (6-8 points)
  2: [
    {
      title: "Build a $500 starter emergency fund",
      description: "Save $50-100 per paycheck until you have $500. This prevents small emergencies from becoming credit card debt.",
      priority: 'urgent',
      timeframe: "Next 2 months"
    },
    {
      title: "Automate all minimum payments",
      description: "Set up autopay for at least the minimum on every bill. This protects your credit score while you work on paying extra.",
      priority: 'high',
      timeframe: "This week"
    },
    {
      title: "Track spending for one full month",
      description: "Use an app or notebook to record every purchase. You can't fix what you don't measure.",
      priority: 'high',
      timeframe: "Starting today"
    },
    {
      title: "Identify your three biggest money leaks",
      description: "Look for subscriptions you forgot about, eating out too often, or impulse shopping. Cut or reduce these immediately.",
      priority: 'high',
      timeframe: "After tracking"
    },
    {
      title: "Create a realistic monthly budget",
      description: "Use the 50/30/20 rule as a starting point: 50% needs, 30% wants, 20% savings and debt payments.",
      priority: 'medium',
      timeframe: "End of month"
    }
  ],

  // Stage 3: Budget Beginner (9-11 points)
  3: [
    {
      title: "Master the zero-based budget method",
      description: "Give every dollar a job before the month begins. Income minus expenses should equal zero, with savings treated as an expense.",
      priority: 'high',
      timeframe: "Next month"
    },
    {
      title: "Build your emergency fund to $1,000",
      description: "Increase your starter fund to a full $1,000. This covers most car repairs, medical bills, or home emergencies.",
      priority: 'high',
      timeframe: "Next 3 months"
    },
    {
      title: "Start the debt snowball",
      description: "List debts smallest to largest. Pay minimums on all, then attack the smallest with everything extra. The wins build momentum.",
      priority: 'high',
      timeframe: "This month"
    },
    {
      title: "Negotiate one major bill",
      description: "Call your cell phone, insurance, or cable company. Ask for a lower rate or switch to a cheaper plan. Save $20-50/month.",
      priority: 'medium',
      timeframe: "This week"
    },
    {
      title: "Set up sinking funds for irregular expenses",
      description: "Save monthly for Christmas, car registration, and other periodic expenses. $50/month prevents these from breaking your budget.",
      priority: 'medium',
      timeframe: "Next paycheck"
    }
  ],

  // Stage 4: Debt Destroyer (12-14 points)
  4: [
    {
      title: "Accelerate your debt payoff with extra payments",
      description: "Throw every windfall at debt: tax refunds, bonuses, gifts. Even an extra $100/month can save years of payments.",
      priority: 'high',
      timeframe: "Ongoing"
    },
    {
      title: "Consider debt consolidation or balance transfers",
      description: "If you have good credit, a 0% balance transfer or personal loan might reduce interest and speed up payoff.",
      priority: 'medium',
      timeframe: "Research this month"
    },
    {
      title: "Increase income with a specific debt-payoff goal",
      description: "Take on a side hustle with 100% of earnings going to debt. Driving for Uber 10 hours/week could add $500/month.",
      priority: 'high',
      timeframe: "Start this month"
    },
    {
      title: "Build emergency fund to 1 month of expenses",
      description: "While focusing on debt, slowly increase your emergency fund. One month of expenses prevents backsliding during setbacks.",
      priority: 'medium',
      timeframe: "Next 6 months"
    },
    {
      title: "Celebrate milestones without spending",
      description: "As you pay off each debt, celebrate! Take a hike, have a movie night, or share your win online. Momentum matters.",
      priority: 'medium',
      timeframe: "Each payoff"
    }
  ],

  // Stage 5: Safety Net Builder (15-17 points)
  5: [
    {
      title: "Build 3-month emergency fund",
      description: "Expand your fund to cover 3 months of essential expenses. This is true financial peace of mind.",
      priority: 'high',
      timeframe: "Next 6-9 months"
    },
    {
      title: "Start investing 5% for retirement",
      description: "Even while building savings, start with your employer's 401k match. It's free money you can't afford to miss.",
      priority: 'high',
      timeframe: "Next paycheck"
    },
    {
      title: "Optimize your insurance coverage",
      description: "Review auto, renters/home, and health insurance. Proper coverage prevents one accident from destroying your progress.",
      priority: 'medium',
      timeframe: "This month"
    },
    {
      title: "Create specific savings goals",
      description: "Beyond emergencies, save for a car, vacation, or home down payment. Visual progress tracking keeps you motivated.",
      priority: 'medium',
      timeframe: "This week"
    },
    {
      title: "Automate your entire financial system",
      description: "Set up automatic transfers for bills, savings, and investments. The best system is one that runs without you.",
      priority: 'high',
      timeframe: "This weekend"
    }
  ],

  // Stage 6: Smart Saver (18-20 points)
  6: [
    {
      title: "Increase retirement contributions to 10-15%",
      description: "With debt controlled and emergencies covered, accelerate retirement savings. Future you will thank present you.",
      priority: 'high',
      timeframe: "Next enrollment"
    },
    {
      title: "Open and fund a Roth IRA",
      description: "Contribute up to $6,500/year for tax-free retirement growth. Even $200/month makes a huge long-term difference.",
      priority: 'high',
      timeframe: "This month"
    },
    {
      title: "Build 6-month emergency fund",
      description: "Expand from 3 to 6 months of expenses. This covers job loss, medical issues, or major home repairs.",
      priority: 'medium',
      timeframe: "Next year"
    },
    {
      title: "Start a taxable investment account",
      description: "After maxing retirement accounts, invest in index funds for medium-term goals like early retirement or big purchases.",
      priority: 'medium',
      timeframe: "After IRA funded"
    },
    {
      title: "Create a long-term financial plan",
      description: "Map out 5, 10, and 20-year goals. Include retirement age, major purchases, and legacy planning.",
      priority: 'medium',
      timeframe: "Next month"
    }
  ],

  // Stage 7: Wealth Strategist (21-22 points)
  7: [
    {
      title: "Max out all tax-advantaged accounts",
      description: "Contribute the maximum to 401k ($23,000), IRA ($6,500), and HSA ($3,850/$7,750). Tax savings accelerate wealth building.",
      priority: 'high',
      timeframe: "This year"
    },
    {
      title: "Develop multiple income streams",
      description: "Add rental income, dividends, or a business. Diversified income provides security and accelerates wealth building.",
      priority: 'medium',
      timeframe: "Next 6 months"
    },
    {
      title: "Optimize your investment strategy",
      description: "Review asset allocation, rebalance quarterly, and ensure fees are under 0.2%. Small optimizations compound significantly.",
      priority: 'medium',
      timeframe: "This quarter"
    },
    {
      title: "Consider real estate investment",
      description: "Whether rental property or REITs, real estate diversifies your portfolio and provides inflation protection.",
      priority: 'medium',
      timeframe: "Research now"
    },
    {
      title: "Plan for early retirement or financial independence",
      description: "Calculate your FI number (25x annual expenses). Create a plan to reach it through saving 25-50% of income.",
      priority: 'medium',
      timeframe: "This month"
    }
  ],

  // Stage 8: FIRE Ready (23-24 points)
  8: [
    {
      title: "Execute tax optimization strategies",
      description: "Use tax-loss harvesting, donor-advised funds, and Roth conversions. At this level, tax strategy is crucial.",
      priority: 'high',
      timeframe: "Quarterly review"
    },
    {
      title: "Build a withdrawal strategy",
      description: "Plan how to access funds in early retirement: Roth ladders, 72(t) distributions, and taxable account withdrawals.",
      priority: 'high',
      timeframe: "Before retiring"
    },
    {
      title: "Create a legacy plan",
      description: "Update wills, trusts, and beneficiaries. Consider charitable giving strategies for tax benefits and impact.",
      priority: 'medium',
      timeframe: "This year"
    },
    {
      title: "Mentor others on their financial journey",
      description: "Share your knowledge through blogging, coaching, or informal mentoring. Teaching reinforces your own discipline.",
      priority: 'medium',
      timeframe: "Ongoing"
    },
    {
      title: "Focus on life optimization, not just money",
      description: "With financial independence achieved or near, optimize for health, relationships, and meaningful work or hobbies.",
      priority: 'high',
      timeframe: "Daily practice"
    }
  ]
};