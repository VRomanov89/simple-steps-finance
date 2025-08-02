'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserData, StepData } from '@/utils/dashboard';
import { getUserDashboardData, updateUserProgress, checkUserSubscription, migrateLocalStorageToDatabase } from '@/lib/user-service';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [isPaidUser, setIsPaidUser] = useState(false);

  // Check if user has paid subscription
  const checkSubscriptionStatus = () => {
    if (!user) return false;
    
    // Check user's public metadata for subscription status
    const metadata = user.publicMetadata as any;
    return metadata?.subscriptionStatus === 'active' || 
           metadata?.plan === 'premium' ||
           metadata?.isPaid === true;
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (isLoaded && user) {
        try {
          // First, migrate any localStorage data to database
          await migrateLocalStorageToDatabase(user.id);
          
          // Check subscription status from database
          const hasActiveSubscription = await checkUserSubscription(user.id);
          setIsPaidUser(hasActiveSubscription);
          
          // Load user data from database
          const dashboardData = await getUserDashboardData(user.id);
          setUserData(dashboardData);
          setLoading(false);
        } catch (error) {
          console.error('Error loading user data:', error);
          setLoading(false);
        }
      }
    };

    loadUserData();
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
          
          const newProgress = {
            completed_steps: [...prev.roadmap_progress.completed_steps, stepId],
            current_step: getNextStepId(stepId, prev.stage.steps) || stepId
          };
          
          // Save progress to database
          if (user) {
            updateUserProgress(user.id, newProgress).catch(error => {
              console.error('Failed to save progress to database:', error);
            });
          }
          
          return {
            ...prev,
            stage: { ...prev.stage, steps: updatedSteps },
            roadmap_progress: newProgress
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

  const handleRetakeQuiz = async () => {
    // Clear any remaining localStorage data
    localStorage.removeItem('quizResults');
    localStorage.removeItem('dashboardProgress');
    
    // Reset user progress in database
    if (user) {
      try {
        await updateUserProgress(user.id, {
          completed_steps: [],
          current_step: ''
        });
      } catch (error) {
        console.error('Failed to reset progress in database:', error);
      }
    }
    
    // Redirect to quiz
    router.push('/quiz');
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
            <div className="card card-elevated" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#111827'
                }}>
                  Your Action Plan
                </h2>
                {!isPaidUser && (
                  <div style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    borderRadius: '2rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Free Preview
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {userData.stage.steps.map((step, index) => {
                  const isCompleted = step.completed;
                  const isCurrent = step.current;
                  const showAssessment = selectedStep === step.id && isPaidUser;
                  const isBlocked = !isPaidUser && index > 0; // Only show first step for free users
                  
                  return (
                    <div key={step.id} style={{ position: 'relative' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '1.25rem',
                        borderRadius: '0.75rem',
                        border: '2px solid',
                        borderColor: isBlocked ? '#e5e7eb' : (isCompleted ? '#86efac' : isCurrent ? '#93c5fd' : '#e5e7eb'),
                        backgroundColor: isBlocked ? '#f9fafb' : (isCompleted ? '#f0fdf4' : isCurrent ? '#eff6ff' : '#ffffff'),
                        transition: 'all 0.2s ease-in-out',
                        cursor: isCurrent && !showAssessment && !isBlocked ? 'pointer' : 'default',
                        filter: isBlocked ? 'blur(2px)' : 'none',
                        opacity: isBlocked ? 0.6 : 1
                      }}
                      onClick={() => isCurrent && !showAssessment && !isBlocked && setSelectedStep(step.id)}
                      >
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '50%',
                          backgroundColor: isBlocked ? '#e5e7eb' : (isCompleted ? '#10b981' : isCurrent ? '#2563eb' : '#e5e7eb'),
                          color: isBlocked ? '#6b7280' : (isCompleted || isCurrent ? '#ffffff' : '#6b7280'),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          fontSize: '1rem',
                          flexShrink: 0
                        }}>
                          {isBlocked ? '🔒' : (isCompleted ? '✓' : index + 1)}
                        </div>
                        
                        <div style={{ marginLeft: '1rem', flex: 1 }}>
                          <p style={{
                            fontWeight: '600',
                            color: isBlocked ? '#6b7280' : (isCompleted ? '#166534' : '#111827'),
                            marginBottom: '0.25rem',
                            textDecoration: isCompleted ? 'line-through' : 'none'
                          }}>
                            {step.title}
                          </p>
                          <p style={{
                            fontSize: '0.875rem',
                            color: isBlocked ? '#6b7280' : (isCompleted ? '#4ade80' : '#6b7280'),
                            marginBottom: isCurrent && !showAssessment && !isBlocked ? '0.5rem' : '0'
                          }}>
                            {step.description}
                          </p>
                          {isCurrent && !showAssessment && !isBlocked && (
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
                      
                      
                      {/* Assessment Section - Only for paid users */}
                      {showAssessment && isPaidUser && (
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

              {/* Upgrade CTA for free users */}
              {!isPaidUser && (
                <div style={{
                  marginTop: '2rem',
                  padding: '2rem',
                  backgroundColor: '#eff6ff',
                  borderRadius: '0.75rem',
                  border: '1px solid #93c5fd',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1e40af',
                    marginBottom: '1rem'
                  }}>
                    Unlock Your Complete Financial Roadmap
                  </h3>
                  <p style={{
                    color: '#1e40af',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    Get access to all {userData.stage.steps.length} personalized action steps, interactive assessments, and progress tracking to accelerate your financial journey.
                  </p>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    <Link href="/pricing">
                      <button className="btn btn-primary btn-lg">
                        Upgrade to Premium - $9/month
                      </button>
                    </Link>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      Cancel anytime • 30-day money-back guarantee
                    </p>
                  </div>
                </div>
              )}
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
                
                {/* Retake Quiz Button */}
                <div style={{ 
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <button 
                    onClick={handleRetakeQuiz}
                    className="btn btn-outline"
                    style={{ width: '100%' }}
                  >
                    🔄 Retake Quiz
                  </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}