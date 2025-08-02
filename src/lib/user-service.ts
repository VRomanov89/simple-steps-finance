import { User } from '@/types';
import { getUserById, updateUser, upsertUserFromAuth, saveQuizResults, updateUserStage } from './database';
import { STAGE_NEXT_STEPS } from '@/constants/stage-next-steps';
import { convertNextStepsToSteps } from '@/utils/dashboard';

// Get user from database by Clerk ID
export async function getUserFromDatabase(clerkUserId: string): Promise<User | null> {
  try {
    return await getUserById(clerkUserId);
  } catch (error) {
    console.error('Error fetching user from database:', error);
    console.warn('Falling back to localStorage mode');
    return null;
  }
}

// Create or update user in database when they first sign up
export async function ensureUserExists(clerkUser: {
  id: string;
  primaryEmailAddress?: { emailAddress: string };
  firstName?: string;
  lastName?: string;
}): Promise<User> {
  try {
    // Try to get existing user
    let user = await getUserById(clerkUser.id);
    
    if (!user) {
      // Create new user
      const fullName = clerkUser.firstName && clerkUser.lastName 
        ? `${clerkUser.firstName} ${clerkUser.lastName}` 
        : clerkUser.firstName || clerkUser.lastName || undefined;

      user = await upsertUserFromAuth({
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        full_name: fullName,
        auth_provider: 'clerk',
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    throw error;
  }
}

// Save quiz results and update user stage
export async function saveUserQuizResults(
  clerkUserId: string, 
  quizResults: {
    totalScore: number;
    stage: { id: number; label: string; description: string };
    answers: Array<{ questionId: number; answer: string; score: number }>;
  }
) {
  try {
    // Ensure user exists
    const clerkUser = { id: clerkUserId };
    await ensureUserExists(clerkUser as any);

    // Save individual quiz answers
    await saveQuizResults(clerkUserId, quizResults.answers.map(answer => ({
      user_id: clerkUserId,
      question_id: answer.questionId,
      answer: answer.answer,
      score: answer.score,
    })));

    // Update user's stage and score
    const updatedUser = await updateUserStage(
      clerkUserId, 
      quizResults.totalScore, 
      quizResults.stage.id
    );

    console.log('✅ Quiz results saved and user stage updated');
    return updatedUser;
  } catch (error) {
    console.error('Error saving quiz results:', error);
    throw error;
  }
}

// Get user's dashboard data (stage, steps, progress)
export async function getUserDashboardData(clerkUserId: string) {
  try {
    const user = await getUserById(clerkUserId);
    if (!user) {
      console.log('User not found in database, returning null');
      return null;
    }

    // Get stage info - use stage_id from user or default to 1
    const stageId = user.stage_id || 1;
    const stageLabels = [
      '', // index 0 (unused)
      'Buried in Debt',
      'Stabilizing', 
      'Budget Beginner',
      'Debt Destroyer',
      'Safety Net Builder',
      'Smart Saver',
      'Wealth Strategist',
      'FIRE Ready'
    ];
    
    const stageDescriptions = [
      '', // index 0 (unused)
      'Overwhelmed by debt and stress — needs stability first',
      'Starting to catch up, still paycheck to paycheck',
      'Building structure, new to tracking',
      'Actively paying down balances with a plan',
      'Emergency fund growing, basic control gained',
      'Regular budgeting and early investing',
      'Multi-goal planning and consistent investing',
      'Financially independent or close to it'
    ];

    // Get stage steps from constants
    const nextSteps = STAGE_NEXT_STEPS[stageId] || STAGE_NEXT_STEPS[1];
    const steps = convertNextStepsToSteps(stageId, nextSteps);

    // Load user's progress if exists
    const roadmapProgress = (user.roadmap_progress as any) || {
      completed_steps: [],
      current_step: steps[0]?.id || ''
    };

    // Update step completion status based on saved progress
    steps.forEach(step => {
      step.completed = roadmapProgress.completed_steps.includes(step.id);
      step.current = step.id === roadmapProgress.current_step;
    });

    return {
      stage: {
        id: stageId,
        label: stageLabels[stageId] || 'Getting Started',
        description: stageDescriptions[stageId] || 'Beginning your financial journey',
        steps
      },
      quiz_score: user.quiz_score || 0,
      roadmap_progress,
      subscription_status: user.subscription_status || 'free'
    };
  } catch (error) {
    console.error('Error fetching user dashboard data:', error);
    return null;
  }
}

// Update user's dashboard progress
export async function updateUserProgress(
  clerkUserId: string, 
  progress: { completed_steps: string[]; current_step: string }
) {
  try {
    await updateUser(clerkUserId, {
      roadmap_progress: progress,
      last_active_at: new Date().toISOString(),
    });
    console.log('✅ User progress updated in database');
  } catch (error) {
    console.error('Error updating user progress:', error);
    throw error;
  }
}

// Check if user has active subscription
export async function checkUserSubscription(clerkUserId: string): Promise<boolean> {
  try {
    const user = await getUserById(clerkUserId);
    return user?.subscription_status === 'active';
  } catch (error) {
    console.error('Error checking user subscription:', error);
    return false;
  }
}

// Sync user data from localStorage to database (migration helper)
export async function migrateLocalStorageToDatabase(clerkUserId: string) {
  try {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Check if user has quiz results in localStorage
    const quizResults = localStorage.getItem('quizResults');
    const dashboardProgress = localStorage.getItem('dashboardProgress');

    if (quizResults) {
      const parsedResults = JSON.parse(quizResults);
      console.log('📦 Migrating quiz results from localStorage to database');
      
      await saveUserQuizResults(clerkUserId, {
        totalScore: parsedResults.totalScore,
        stage: parsedResults.stage,
        answers: parsedResults.answers || []
      });

      // Clear localStorage after successful migration
      localStorage.removeItem('quizResults');
    }

    if (dashboardProgress) {
      const parsedProgress = JSON.parse(dashboardProgress);
      console.log('📦 Migrating dashboard progress from localStorage to database');
      
      await updateUserProgress(clerkUserId, parsedProgress);

      // Clear localStorage after successful migration
      localStorage.removeItem('dashboardProgress');
    }

    console.log('✅ Migration from localStorage to database completed');
  } catch (error) {
    console.error('Error migrating localStorage to database:', error);
    // Don't throw - this is a best-effort migration
  }
}