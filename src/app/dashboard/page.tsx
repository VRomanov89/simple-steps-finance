'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface StepData {
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

interface UserData {
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

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isLoaded && user) {
      setTimeout(() => {
        setUserData({
          stage: {
            id: 3,
            label: 'Budget Beginner',
            description: 'Building structure, new to tracking',
            steps: [
              {
                id: 'budget',
                title: 'Create a zero-based budget',
                description: 'Learn to allocate every dollar with purpose using the zero-based budgeting method.',
                assessment: {
                  question: 'What is the main goal of zero-based budgeting?',
                  options: [
                    { text: 'To spend all your money', correct: false },
                    { text: 'To allocate every dollar to a specific category', correct: true },
                    { text: 'To save as much as possible', correct: false },
                    { text: 'To track expenses only', correct: false }
                  ]
                },
                resources: [
                  'Zero-Based Budget Template',
                  'Budget Categories Guide',
                  'Monthly Budget Planner'
                ],
                completed: true,
                current: false
              },
              {
                id: 'tracking',
                title: 'Track expenses weekly',
                description: 'Develop the habit of monitoring your spending patterns to stay on budget.',
                assessment: {
                  question: 'How often should you review your expenses to build good habits?',
                  options: [
                    { text: 'Once a month', correct: false },
                    { text: 'Weekly', correct: true },
                    { text: 'Daily', correct: false },
                    { text: 'Yearly', correct: false }
                  ]
                },
                resources: [
                  'Expense Tracking App Guide',
                  'Weekly Review Checklist',
                  'Spending Categories Worksheet'
                ],
                completed: false,
                current: true
              },
              {
                id: 'emergency',
                title: 'Save first $1,000 emergency fund',
                description: 'Build a starter emergency fund to protect against unexpected expenses.',
                assessment: {
                  question: 'Why is $1,000 a good starting amount for an emergency fund?',
                  options: [
                    { text: 'It covers most small emergencies', correct: true },
                    { text: 'It\'s the maximum you should save', correct: false },
                    { text: 'It\'s required by law', correct: false },
                    { text: 'It earns the most interest', correct: false }
                  ]
                },
                resources: [
                  'Emergency Fund Calculator',
                  'High-Yield Savings Guide',
                  'Emergency Fund Challenge'
                ],
                completed: false,
                current: false
              },
              {
                id: 'debt',
                title: 'Pay more than minimums on smallest debt',
                description: 'Use the debt snowball method to eliminate your smallest debt first.',
                assessment: {
                  question: 'What is the debt snowball method?',
                  options: [
                    { text: 'Pay minimums on all debts', correct: false },
                    { text: 'Pay extra on the highest interest debt', correct: false },
                    { text: 'Pay extra on the smallest debt first', correct: true },
                    { text: 'Consolidate all debts', correct: false }
                  ]
                },
                resources: [
                  'Debt Snowball Calculator',
                  'Debt Payoff Tracker',
                  'Motivation Tips Guide'
                ],
                completed: false,
                current: false
              },
              {
                id: 'automation',
                title: 'Automate bill payments',
                description: 'Set up automatic payments to never miss due dates and improve your credit.',
                assessment: {
                  question: 'What\'s the main benefit of automating bill payments?',
                  options: [
                    { text: 'It saves money on fees', correct: false },
                    { text: 'It prevents late payments and fees', correct: true },
                    { text: 'It reduces your bills', correct: false },
                    { text: 'It eliminates all debt', correct: false }
                  ]
                },
                resources: [
                  'Automation Setup Guide',
                  'Bill Calendar Template',
                  'Bank Setup Instructions'
                ],
                completed: false,
                current: false
              }
            ]
          },
          quiz_score: 11,
          roadmap_progress: {
            completed_steps: ['budget'],
            current_step: 'tracking'
          }
        });
        setLoading(false);
      }, 1000);
    }
  }, [isLoaded, user]);

  const handleAssessmentSubmit = (stepId: string) => {
    const selectedAnswer = assessmentAnswers[stepId];
    const step = userData?.stage.steps.find(s => s.id === stepId);
    
    if (selectedAnswer !== undefined && step) {
      const isCorrect = step.assessment.options[selectedAnswer].correct;
      
      if (isCorrect) {
        // Mark step as completed and move to next step
        setUserData(prev => {
          if (!prev) return prev;
          
          const updatedSteps = prev.stage.steps.map(s => {
            if (s.id === stepId) return { ...s, completed: true, current: false };
            if (s.id === getNextStepId(stepId, prev.stage.steps)) return { ...s, current: true };
            return s;
          });
          
          return {
            ...prev,
            stage: { ...prev.stage, steps: updatedSteps },
            roadmap_progress: {
              ...prev.roadmap_progress,
              completed_steps: [...prev.roadmap_progress.completed_steps, stepId],
              current_step: getNextStepId(stepId, prev.stage.steps) || stepId
            }
          };
        });
        setSelectedStep(null);
        setAssessmentAnswers(prev => ({ ...prev, [stepId]: undefined }));
      } else {
        alert('That\'s not quite right. Try again!');
      }
    }
  };

  const getNextStepId = (currentStepId: string, steps: StepData[]): string | null => {
    const currentIndex = steps.findIndex(s => s.id === currentStepId);
    return currentIndex < steps.length - 1 ? steps[currentIndex + 1].id : null;
  };

  if (!isLoaded || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '4px solid #2563eb',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            margin: '0 auto 1rem auto',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: '#4b5563', fontSize: '1.125rem' }}>Loading your dashboard...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div className="card card-elevated" style={{ maxWidth: '28rem', textAlign: 'center', padding: '2.5rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎯</span>
          </div>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Welcome to Simple Steps Finance!
          </h2>
          <p style={{
            color: '#4b5563',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            It looks like you haven't taken our financial assessment quiz yet. Let's get started on your journey to financial freedom!
          </p>
          <Link href="/quiz">
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Take Your Free Assessment
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const getStageColor = (stageId: number) => {
    if (stageId <= 2) return { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' };
    if (stageId <= 4) return { bg: '#fffbeb', text: '#92400e', border: '#fde68a' };
    if (stageId <= 6) return { bg: '#eff6ff', text: '#1e40af', border: '#93c5fd' };
    return { bg: '#f0fdf4', text: '#166534', border: '#86efac' };
  };

  const completedSteps = userData.stage.steps.filter(s => s.completed);
  const totalSteps = userData.stage.steps.length;
  const progressPercentage = (completedSteps.length / totalSteps) * 100;
  const stageColors = getStageColor(userData.stage.id);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>
            Welcome back, {user?.firstName || 'there'}!
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#4b5563'
          }}>
            Here's your personalized financial roadmap and progress.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          
          {/* Main Content */}
          <div style={{ gridColumn: 'span 2' }}>
            
            {/* Current Stage */}
            <div className="card card-elevated" style={{ marginBottom: '2rem', padding: '2rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#111827'
                }}>
                  Your Current Stage
                </h2>
                <div style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '2rem',
                  border: `2px solid ${stageColors.border}`,
                  backgroundColor: stageColors.bg,
                  color: stageColors.text,
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  Stage {userData.stage.id}
                </div>
              </div>
              
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {userData.stage.label}
              </h3>
              <p style={{
                color: '#4b5563',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                {userData.stage.description}
              </p>
              
              <div style={{
                backgroundColor: '#f3f4f6',
                borderRadius: '0.75rem',
                padding: '1.25rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>
                    Progress to Next Stage
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '0.75rem',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '0.375rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    borderRadius: '0.375rem',
                    width: `${progressPercentage}%`,
                    transition: 'width 1s ease-in-out'
                  }} />
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="card card-elevated" style={{ padding: '2rem' }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.5rem'
              }}>
                Your Action Plan
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {userData.stage.steps.map((step, index) => {
                  const isCompleted = step.completed;
                  const isCurrent = step.current;
                  const showAssessment = selectedStep === step.id;
                  
                  return (
                    <div key={step.id}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '1.25rem',
                        borderRadius: '0.75rem',
                        border: '2px solid',
                        borderColor: isCompleted ? '#86efac' : isCurrent ? '#93c5fd' : '#e5e7eb',
                        backgroundColor: isCompleted ? '#f0fdf4' : isCurrent ? '#eff6ff' : '#ffffff',
                        transition: 'all 0.2s ease-in-out',
                        cursor: isCurrent && !showAssessment ? 'pointer' : 'default'
                      }}
                      onClick={() => isCurrent && !showAssessment && setSelectedStep(step.id)}
                      >
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '50%',
                          backgroundColor: isCompleted ? '#10b981' : isCurrent ? '#2563eb' : '#e5e7eb',
                          color: isCompleted || isCurrent ? '#ffffff' : '#6b7280',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          fontSize: '1rem',
                          flexShrink: 0
                        }}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        
                        <div style={{ marginLeft: '1rem', flex: 1 }}>
                          <p style={{
                            fontWeight: '600',
                            color: isCompleted ? '#166534' : '#111827',
                            marginBottom: '0.25rem',
                            textDecoration: isCompleted ? 'line-through' : 'none'
                          }}>
                            {step.title}
                          </p>
                          <p style={{
                            fontSize: '0.875rem',
                            color: isCompleted ? '#4ade80' : '#6b7280',
                            marginBottom: isCurrent && !showAssessment ? '0.5rem' : '0'
                          }}>
                            {step.description}
                          </p>
                          {isCurrent && !showAssessment && (
                            <p style={{
                              fontSize: '0.875rem',
                              color: '#2563eb',
                              fontWeight: '500'
                            }}>
                              Click to start assessment →
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Assessment Section */}
                      {showAssessment && (
                        <div style={{
                          marginTop: '1rem',
                          marginLeft: '3.5rem',
                          padding: '1.5rem',
                          backgroundColor: '#f9fafb',
                          borderRadius: '0.75rem',
                          border: '1px solid #e5e7eb'
                        }}>
                          <h4 style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '1rem'
                          }}>
                            {step.assessment.question}
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            {step.assessment.options.map((option, optionIndex) => (
                              <label key={optionIndex} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1rem',
                                backgroundColor: assessmentAnswers[step.id] === optionIndex ? '#eff6ff' : '#ffffff',
                                border: '2px solid',
                                borderColor: assessmentAnswers[step.id] === optionIndex ? '#2563eb' : '#e5e7eb',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out'
                              }}>
                                <input
                                  type="radio"
                                  name={`assessment-${step.id}`}
                                  value={optionIndex}
                                  checked={assessmentAnswers[step.id] === optionIndex}
                                  onChange={() => setAssessmentAnswers(prev => ({ ...prev, [step.id]: optionIndex }))}
                                  style={{ marginRight: '0.75rem' }}
                                />
                                <span style={{
                                  color: '#374151',
                                  fontSize: '0.9375rem'
                                }}>
                                  {option.text}
                                </span>
                              </label>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAssessmentSubmit(step.id)}
                              disabled={assessmentAnswers[step.id] === undefined}
                              style={{
                                opacity: assessmentAnswers[step.id] === undefined ? 0.5 : 1,
                                cursor: assessmentAnswers[step.id] === undefined ? 'not-allowed' : 'pointer'
                              }}
                            >
                              Submit Answer
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => {
                                setSelectedStep(null);
                                setAssessmentAnswers(prev => ({ ...prev, [step.id]: undefined }));
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Quick Stats */}
            <div className="card card-elevated" style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Quick Stats
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Quiz Score</span>
                  <span style={{ fontWeight: '600', color: '#111827' }}>{userData.quiz_score}/24</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Steps Completed</span>
                  <span style={{ fontWeight: '600', color: '#111827' }}>{completedSteps.length}/{totalSteps}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Current Stage</span>
                  <span style={{ fontWeight: '600', color: '#111827' }}>{userData.stage.id}/8</span>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="card card-elevated" style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Helpful Resources
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a 
                  href="https://www.nerdwallet.com/article/finance/budget-worksheet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s ease-in-out'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
                  onMouseOut={(e) => e.target.style.color = '#2563eb'}
                >
                  <span>📚</span> Budget Planning Guide
                </a>
                <a 
                  href="https://www.daveramsey.com/blog/debt-snowball-vs-debt-avalanche" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s ease-in-out'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
                  onMouseOut={(e) => e.target.style.color = '#2563eb'}
                >
                  <span>💡</span> Debt Payoff Strategies
                </a>
                <a 
                  href="https://www.mint.com/goals" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s ease-in-out'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
                  onMouseOut={(e) => e.target.style.color = '#2563eb'}
                >
                  <span>🎯</span> Goal Setting Tools
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card card-elevated" style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Quick Actions
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href="/quiz">
                  <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>
                    <span style={{ marginRight: '0.5rem' }}>🔄</span> Retake Quiz
                  </button>
                </Link>
                <button 
                  className="btn btn-outline" 
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                  onClick={() => alert('Progress report feature coming soon!')}
                >
                  <span style={{ marginRight: '0.5rem' }}>📊</span> View Progress Report
                </button>
                <Link href="/settings">
                  <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>
                    <span style={{ marginRight: '0.5rem' }}>⚙️</span> Account Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}