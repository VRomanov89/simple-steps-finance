-- Simple Steps Finance Database Schema
-- This file documents the required database tables for the application

-- Enable Row Level Security (RLS)
-- Note: Run these commands in your Supabase SQL editor

-- Users table - stores user information and subscription status
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Clerk user ID
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  auth_provider TEXT DEFAULT 'clerk',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  stage_id INTEGER REFERENCES stages(id),
  quiz_score INTEGER,
  stripe_customer_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'active', 'canceled')),
  roadmap_progress JSONB DEFAULT '{"completed_steps": [], "current_step": ""}',
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stages table - financial stages and scoring
CREATE TABLE IF NOT EXISTS stages (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  score_min INTEGER NOT NULL,
  score_max INTEGER NOT NULL,
  description TEXT,
  next_steps JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz results table - stores individual quiz answers
CREATE TABLE IF NOT EXISTS quiz_results (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,
  answer TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default stages if they don't exist
INSERT INTO stages (id, label, score_min, score_max, description) VALUES
(1, 'Buried in Debt', 0, 5, 'Overwhelmed by debt and stress — needs stability first'),
(2, 'Stabilizing', 6, 8, 'Starting to catch up, still paycheck to paycheck'),
(3, 'Budget Beginner', 9, 11, 'Building structure, new to tracking'),
(4, 'Debt Destroyer', 12, 14, 'Actively paying down balances with a plan'),
(5, 'Safety Net Builder', 15, 17, 'Emergency fund growing, basic control gained'),
(6, 'Smart Saver', 18, 20, 'Regular budgeting and early investing'),
(7, 'Wealth Strategist', 21, 22, 'Multi-goal planning and consistent investing'),
(8, 'FIRE Ready', 23, 24, 'Financially independent or close to it')
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  score_min = EXCLUDED.score_min,
  score_max = EXCLUDED.score_max,
  description = EXCLUDED.description;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Users can only see and modify their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- Stages are publicly readable
CREATE POLICY "Stages are publicly readable" ON stages
  FOR SELECT USING (true);

-- Quiz results policies
CREATE POLICY "Users can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Service role can access everything (for webhooks)
CREATE POLICY "Service role full access users" ON users
  FOR ALL USING (current_setting('role') = 'service_role');

CREATE POLICY "Service role full access quiz_results" ON quiz_results
  FOR ALL USING (current_setting('role') = 'service_role');

-- Add helpful functions

-- Function to get user's current stage
CREATE OR REPLACE FUNCTION get_user_stage(user_quiz_score INTEGER)
RETURNS stages AS $$
DECLARE
  user_stage stages;
BEGIN
  SELECT * INTO user_stage
  FROM stages
  WHERE user_quiz_score >= score_min AND user_quiz_score <= score_max
  LIMIT 1;
  
  -- If no stage found, return first stage
  IF user_stage IS NULL THEN
    SELECT * INTO user_stage FROM stages WHERE id = 1;
  END IF;
  
  RETURN user_stage;
END;
$$ LANGUAGE plpgsql;

-- Function to update user's last active timestamp
CREATE OR REPLACE FUNCTION update_user_last_active()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_active_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update last_active_at
CREATE TRIGGER trigger_update_user_last_active
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_user_last_active();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON users TO anon, authenticated;
GRANT ALL ON stages TO anon, authenticated;
GRANT ALL ON quiz_results TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;