import { STAGE_NEXT_STEPS, NextStep } from '@/constants/stage-next-steps';

export interface StepData {
  id: string;
  title: string;
  description: string;
  assessment: {
    question: string;
    options: { text: string; correct: boolean }[];
  };
  resources: string[];
  completed: boolean;
  current: boolean;
}

export interface UserData {
  stage: {
    id: number;
    label: string;
    description: string;
    steps: StepData[];
  };
  quiz_score: number;
  roadmap_progress: {
    completed_steps: string[];
    current_step: string;
  };
}

// Convert stage next steps to dashboard steps format
export const convertNextStepsToSteps = (stageId: number, nextSteps: NextStep[]): StepData[] => {
  return nextSteps.map((nextStep, index) => {
    const stepId = `step-${stageId}-${index + 1}`;
    
    // Generate assessment questions based on the step content
    const assessmentQuestions = generateAssessmentForStep(nextStep);
    
    return {
      id: stepId,
      title: nextStep.title,
      description: nextStep.description,
      assessment: assessmentQuestions,
      resources: generateResourcesForStep(nextStep),
      completed: false,
      current: index === 0 // First step is current by default
    };
  });
};

// Generate assessment questions based on step content
const generateAssessmentForStep = (step: NextStep) => {
  // Simple assessment questions based on step priority and content
  const questions = {
    'urgent': {
      question: `Have you completed this urgent task: "${step.title}"?`,
      options: [
        { text: 'Yes, I have completed this step', correct: true },
        { text: 'I have started but not finished', correct: false },
        { text: 'I have not started yet', correct: false },
        { text: 'I need more guidance on this', correct: false }
      ]
    },
    'high': {
      question: `How confident are you in implementing: "${step.title}"?`,
      options: [
        { text: 'Very confident and ready to proceed', correct: true },
        { text: 'Somewhat confident', correct: false },
        { text: 'Need some guidance', correct: false },
        { text: 'Not confident at all', correct: false }
      ]
    },
    'medium': {
      question: `What is your plan for: "${step.title}"?`,
      options: [
        { text: 'I have a clear plan and timeline', correct: true },
        { text: 'I have a general idea', correct: false },
        { text: 'I need to learn more first', correct: false },
        { text: 'I need help creating a plan', correct: false }
      ]
    }
  };

  return questions[step.priority] || questions['medium'];
};

// Generate resources based on step content
const generateResourcesForStep = (step: NextStep): string[] => {
  const titleLower = step.title.toLowerCase();
  
  if (titleLower.includes('budget')) {
    return [
      'Budget Planning Worksheet',
      'Expense Tracking Template',
      'Budget Category Guide'
    ];
  } else if (titleLower.includes('debt')) {
    return [
      'Debt Payoff Calculator',
      'Debt Snowball vs Avalanche Guide',
      'Creditor Negotiation Scripts'
    ];
  } else if (titleLower.includes('emergency fund') || titleLower.includes('saving')) {
    return [
      'Emergency Fund Calculator',
      'High-Yield Savings Account Guide',
      'Automatic Savings Setup Guide'
    ];
  } else if (titleLower.includes('credit')) {
    return [
      'Credit Report Guide',
      'Credit Score Improvement Tips',
      'Credit Card Management Strategies'
    ];
  } else if (titleLower.includes('invest')) {
    return [
      'Investment Basics Guide',
      'Risk Assessment Tool',
      'Portfolio Allocation Calculator'
    ];
  } else {
    return [
      'Financial Planning Resources',
      'Step-by-Step Action Guide',
      'Progress Tracking Worksheet'
    ];
  }
};

// Load user data from localStorage and convert to dashboard format
export const loadUserDataFromStorage = (): UserData | null => {
  try {
    // Only run on client side
    if (typeof window === 'undefined') {
      return null;
    }

    const quizResults = localStorage.getItem('quizResults');
    if (!quizResults) return null;

    const parsedResults = JSON.parse(quizResults);
    const { stage, totalScore } = parsedResults;

    if (!stage || typeof totalScore !== 'number') return null;

    // Get next steps for this stage
    const nextSteps = STAGE_NEXT_STEPS[stage.id] || STAGE_NEXT_STEPS[1];
    
    // Convert to dashboard steps
    const steps = convertNextStepsToSteps(stage.id, nextSteps);
    
    // Load saved progress if exists
    const savedProgress = localStorage.getItem('dashboardProgress');
    let roadmapProgress = {
      completed_steps: [],
      current_step: steps[0]?.id || ''
    };

    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        roadmapProgress = parsedProgress;
        
        // Update step completion status based on saved progress
        steps.forEach(step => {
          step.completed = roadmapProgress.completed_steps.includes(step.id);
          step.current = step.id === roadmapProgress.current_step;
        });
      } catch (error) {
        console.warn('Failed to parse saved progress:', error);
      }
    }

    return {
      stage: {
        id: stage.id,
        label: stage.label,
        description: stage.description,
        steps
      },
      quiz_score: totalScore,
      roadmap_progress
    };
  } catch (error) {
    console.error('Failed to load user data from storage:', error);
    return null;
  }
};

// Save dashboard progress to localStorage
export const saveDashboardProgress = (progress: { completed_steps: string[]; current_step: string }) => {
  try {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }
    
    localStorage.setItem('dashboardProgress', JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save dashboard progress:', error);
  }
};