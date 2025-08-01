-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- Create stages table first (no dependencies)
CREATE TABLE IF NOT EXISTS stages (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  score_min INTEGER NOT NULL,
  score_max INTEGER NOT NULL,
  description TEXT,
  next_steps JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  auth_provider TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  stage_id INTEGER REFERENCES stages(id),
  quiz_score INTEGER,
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'active', 'canceled')),
  roadmap_progress JSONB DEFAULT '{}',
  last_active_at TIMESTAMP
);

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,
  answer TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert initial stages data
INSERT INTO stages (id, label, score_min, score_max, description, next_steps) VALUES
(1, 'Buried in Debt', 0, 5, 'Overwhelmed by debt and stress — needs stability first', 
 '{"steps": ["Contact creditors to discuss payment plans", "List all debts and minimum payments", "Create a basic survival budget", "Consider debt consolidation options", "Seek credit counseling if needed"]}'),

(2, 'Stabilizing', 6, 8, 'Starting to catch up, still paycheck to paycheck', 
 '{"steps": ["Make all minimum payments on time", "Build a $500 emergency buffer", "Track spending for 30 days", "Identify areas to cut expenses", "Look for additional income sources"]}'),

(3, 'Budget Beginner', 9, 11, 'Building structure, new to tracking', 
 '{"steps": ["Create a zero-based budget", "Track expenses weekly", "Save first $1,000 emergency fund", "Pay more than minimums on smallest debt", "Automate bill payments"]}'),

(4, 'Debt Destroyer', 12, 14, 'Actively paying down balances with a plan', 
 '{"steps": ["Use debt snowball method", "Increase payments on target debt", "Avoid taking on new debt", "Celebrate debt payoff milestones", "Consider side income for debt payments"]}'),

(5, 'Safety Net Builder', 15, 17, 'Emergency fund growing, basic control gained', 
 '{"steps": ["Build 3-month emergency fund", "Continue debt snowball", "Research employer 401k match", "Open high-yield savings account", "Review and optimize recurring expenses"]}'),

(6, 'Smart Saver', 18, 20, 'Regular budgeting and early investing', 
 '{"steps": ["Start investing 10-15% for retirement", "Build 6-month emergency fund", "Consider Roth IRA", "Optimize insurance coverage", "Plan for major expenses"]}'),

(7, 'Wealth Strategist', 21, 22, 'Multi-goal planning and consistent investing', 
 '{"steps": ["Max out retirement contributions", "Invest in taxable accounts", "Consider real estate investment", "Plan for childrens college", "Review estate planning needs"]}'),

(8, 'FIRE Ready', 23, 24, 'Financially independent or close to it', 
 '{"steps": ["Optimize withdrawal strategies", "Consider geographic arbitrage", "Plan transition to retirement", "Maintain emergency fund", "Focus on tax optimization"]}'
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for quiz_results table
CREATE POLICY "Users can view own quiz results" ON quiz_results
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results" ON quiz_results
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz results" ON quiz_results
    FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for stages table (public read access)
CREATE POLICY "Anyone can view stages" ON stages
    FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stage_id ON users(stage_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at);

-- Create a function to handle user creation from Clerk
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, auth_provider)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'clerk');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The trigger will need to be set up based on your Clerk webhook implementation