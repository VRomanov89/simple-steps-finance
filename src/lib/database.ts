import { supabase, supabaseAdmin } from './supabase';
import { User, Stage, QuizResult } from '@/types';

// User operations
export async function createUser(userData: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      stage:stages(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }
  return data;
}

export async function updateUser(id: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserByStripeCustomer(stripeCustomerId: string, updates: Partial<User>) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(updates)
    .eq('stripe_customer_id', stripeCustomerId)
    .select()
    .single();

  if (error) {
    console.error('Failed to update user by Stripe customer ID:', error);
    throw error;
  }
  return data;
}

// Stage operations
export async function getAllStages(): Promise<Stage[]> {
  const { data, error } = await supabase
    .from('stages')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getStageById(id: number): Promise<Stage | null> {
  const { data, error } = await supabase
    .from('stages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

// Quiz operations
export async function saveQuizResults(userId: string, results: Omit<QuizResult, 'id' | 'created_at'>[]) {
  const quizData = results.map(result => ({
    ...result,
    user_id: userId,
  }));

  const { data, error } = await supabase
    .from('quiz_results')
    .insert(quizData)
    .select();

  if (error) throw error;
  return data;
}

export async function getUserQuizResults(userId: string): Promise<QuizResult[]> {
  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Calculate user stage based on quiz score
export async function calculateUserStage(totalScore: number): Promise<Stage | null> {
  const { data, error } = await supabase
    .from('stages')
    .select('*')
    .lte('score_min', totalScore)
    .gte('score_max', totalScore)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Fallback to first stage if no match found
      return getStageById(1);
    }
    throw error;
  }
  return data;
}

// Update user's financial stage and score
export async function updateUserStage(userId: string, quizScore: number, stageId: number) {
  const { data, error } = await supabase
    .from('users')
    .update({
      quiz_score: quizScore,
      stage_id: stageId,
      last_active_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select(`
      *,
      stage:stages(*)
    `)
    .single();

  if (error) throw error;
  return data;
}

// Admin function to create/update user (for webhooks)
export async function upsertUserFromAuth(authData: {
  id: string;
  email: string;
  full_name?: string;
  auth_provider?: string;
}) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .upsert({
      id: authData.id,
      email: authData.email,
      full_name: authData.full_name,
      auth_provider: authData.auth_provider || 'clerk',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}