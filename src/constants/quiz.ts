import { QuizQuestion } from '@/types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How much non-mortgage debt do you currently have?",
    options: [
      { text: "Over $30,000", score: 0 },
      { text: "$10,000–30,000", score: 1 },
      { text: "Under $10,000", score: 2 },
      { text: "None", score: 3 }
    ]
  },
  {
    id: 2,
    question: "Are you caught up on all your minimum monthly payments?",
    options: [
      { text: "I've missed some this month", score: 0 },
      { text: "I'm behind but catching up", score: 1 },
      { text: "I pay minimums on time", score: 2 },
      { text: "I pay more than minimums", score: 3 }
    ]
  },
  {
    id: 3,
    question: "Do you currently have an emergency fund?",
    options: [
      { text: "No savings at all", score: 0 },
      { text: "Under $1,000 saved", score: 1 },
      { text: "1–3 months of expenses", score: 2 },
      { text: "3+ months saved", score: 3 }
    ]
  },
  {
    id: 4,
    question: "Do you use a budget regularly?",
    options: [
      { text: "I don't budget", score: 0 },
      { text: "I've tried but can't stick to it", score: 1 },
      { text: "I use one occasionally", score: 2 },
      { text: "I use one consistently", score: 3 }
    ]
  },
  {
    id: 5,
    question: "What's your relationship with credit cards?",
    options: [
      { text: "I rely on them for essentials", score: 0 },
      { text: "I carry a balance most months", score: 1 },
      { text: "I pay off most of the time", score: 2 },
      { text: "I pay in full every month", score: 3 }
    ]
  },
  {
    id: 6,
    question: "How much do you invest per month (including retirement)?",
    options: [
      { text: "$0", score: 0 },
      { text: "Less than $100", score: 1 },
      { text: "$100–$500", score: 2 },
      { text: "Over $500", score: 3 }
    ]
  },
  {
    id: 7,
    question: "What's your biggest financial stress right now?",
    options: [
      { text: "Making it to next paycheck", score: 0 },
      { text: "Unexpected expenses", score: 1 },
      { text: "Not building wealth fast enough", score: 2 },
      { text: "None — I feel financially stable", score: 3 }
    ]
  },
  {
    id: 8,
    question: "How confident do you feel about your financial future?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Somewhat", score: 1 },
      { text: "Pretty confident", score: 2 },
      { text: "Extremely confident", score: 3 }
    ]
  }
];

// Updated scoring ranges based on 8 questions (0-24 total possible points)
export const STAGE_SCORING = [
  { id: 1, label: "Buried in Debt", score_min: 0, score_max: 5, description: "Overwhelmed by debt and stress — needs stability first" },
  { id: 2, label: "Stabilizing", score_min: 6, score_max: 8, description: "Starting to catch up, still paycheck to paycheck" },
  { id: 3, label: "Budget Beginner", score_min: 9, score_max: 11, description: "Building structure, new to tracking" },
  { id: 4, label: "Debt Destroyer", score_min: 12, score_max: 14, description: "Actively paying down balances with a plan" },
  { id: 5, label: "Safety Net Builder", score_min: 15, score_max: 17, description: "Emergency fund growing, basic control gained" },
  { id: 6, label: "Smart Saver", score_min: 18, score_max: 20, description: "Regular budgeting and early investing" },
  { id: 7, label: "Wealth Strategist", score_min: 21, score_max: 22, description: "Multi-goal planning and consistent investing" },
  { id: 8, label: "FIRE Ready", score_min: 23, score_max: 24, description: "Financially independent or close to it" }
];

export const getStageFromScore = (score: number) => {
  return STAGE_SCORING.find(stage => score >= stage.score_min && score <= stage.score_max) || STAGE_SCORING[0];
};