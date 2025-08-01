export interface User {
  id: string;
  email: string;
  full_name?: string;
  auth_provider?: string;
  created_at: string;
  stage_id?: number;
  quiz_score?: number;
  stripe_customer_id?: string;
  subscription_status: 'free' | 'active' | 'canceled';
  roadmap_progress?: Record<string, any>;
  last_active_at?: string;
}

export interface Stage {
  id: number;
  label: string;
  score_min: number;
  score_max: number;
  description?: string;
  next_steps?: Record<string, any>;
}

export interface QuizResult {
  id: number;
  user_id: string;
  question_id: number;
  answer: string;
  score: number;
  created_at: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

export interface UserSession {
  user: User;
  stage?: Stage;
}