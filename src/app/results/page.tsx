'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { STAGE_NEXT_STEPS } from '@/constants/stage-next-steps';

interface QuizResults {
  answers: any[];
  totalScore: number;
  stage: any;
  email: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get results from localStorage
    const storedResults = localStorage.getItem('quizResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Redirect to quiz if no results found
      router.push('/quiz');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
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
          <p style={{ color: '#4b5563', fontSize: '1.125rem' }}>Loading your results...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!results) {
    return null; // Will redirect
  }

  const getStageColor = (stageId: number) => {
    if (stageId <= 2) return { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' };
    if (stageId <= 4) return { bg: '#fffbeb', text: '#92400e', border: '#fde68a' };
    if (stageId <= 6) return { bg: '#eff6ff', text: '#1e40af', border: '#93c5fd' };
    return { bg: '#f0fdf4', text: '#166534', border: '#86efac' };
  };

  const getNextSteps = (stageId: number) => {
    // Get the personalized steps for this stage, default to stage 1 if not found
    const steps = STAGE_NEXT_STEPS[stageId] || STAGE_NEXT_STEPS[1];
    // Return the first 5 steps (all of them)
    return steps;
  };

  const stageColors = getStageColor(results.stage.id);

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        paddingTop: '4rem',
        paddingBottom: '5rem'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '56rem', margin: '0 auto' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem auto',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ fontSize: '2rem' }}>🎯</span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              You're at Financial Stage {results.stage.id}
            </h1>
            
            <div style={{
              display: 'inline-flex',
              padding: '0.75rem 2rem',
              borderRadius: '2rem',
              border: `2px solid ${stageColors.border}`,
              backgroundColor: stageColors.bg,
              color: stageColors.text,
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '2rem'
            }}>
              {results.stage.label}
            </div>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              color: '#4b5563',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              {results.stage.description}
            </p>

            {/* Score Display */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: '#ffffff',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#2563eb'
                }}>
                  {results.totalScore}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  out of 24
                </div>
              </div>
              <div style={{ width: '1px', height: '2rem', backgroundColor: '#e5e7eb' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#10b981'
                }}>
                  {Math.round(((results.totalScore / 24) * 100))}%
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  Complete
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Content */}
      <section style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: '#f9fafb'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            
            {/* What This Means */}
            <div className="card card-elevated" style={{ padding: '2.5rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.5rem'
              }}>
                What This Means for You
              </h2>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                {results.stage.id <= 2 && "You're in the early stages of your financial journey. This is actually a great place to start because now you know exactly where you stand. Many people never take this important first step - you're already ahead of the game."}
                {results.stage.id > 2 && results.stage.id <= 4 && "You're making real progress! You've moved beyond survival mode and are starting to build good financial habits. This is where momentum really begins to build and compound."}
                {results.stage.id > 4 && results.stage.id <= 6 && "You're doing great! You've built a solid foundation and are now in the growth phase of your financial journey. Keep up the excellent work - you're on the right path."}
                {results.stage.id > 6 && "Congratulations! You're in the advanced stages of financial success. You're well on your way to or have already achieved financial independence. Focus on optimization and wealth building."}
              </p>
            </div>

            {/* Progress Visualization */}
            <div className="card card-elevated" style={{ padding: '2.5rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.5rem'
              }}>
                Your Progress
              </h2>
              
              {/* Progress Bar */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Financial Readiness</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2563eb' }}>
                    {Math.round(((results.totalScore / 24) * 100))}%
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
                    width: `${(results.totalScore / 24) * 100}%`,
                    transition: 'width 1s ease-in-out'
                  }} />
                </div>
              </div>

              <div style={{
                backgroundColor: stageColors.bg,
                border: `1px solid ${stageColors.border}`,
                borderRadius: '0.75rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <p style={{
                  color: stageColors.text,
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  You scored higher than
                </p>
                <p style={{
                  color: stageColors.text,
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>
                  {Math.round(((results.totalScore / 24) * 70) + 15)}% of people
                </p>
                <p style={{
                  color: stageColors.text,
                  fontSize: '0.875rem',
                  marginTop: '0.5rem'
                }}>
                  who take this assessment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: '#ffffff'
      }}>
        <div className="container">
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <div className="card card-elevated" style={{ padding: '3rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Your Personalized Next Steps
                </h2>
                <p style={{
                  color: '#4b5563',
                  fontSize: '1.125rem',
                  lineHeight: '1.6'
                }}>
                  Based on your assessment, here's exactly what to focus on next:
                </p>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                marginBottom: '3rem'
              }}>
                {getNextSteps(results.stage.id).map((step, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.5rem',
                    backgroundColor: step.priority === 'urgent' ? '#fef2f2' : '#f9fafb',
                    borderRadius: '0.75rem',
                    border: `1px solid ${step.priority === 'urgent' ? '#fecaca' : '#e5e7eb'}`,
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      backgroundColor: step.priority === 'urgent' ? '#dc2626' : step.priority === 'high' ? '#2563eb' : '#6b7280',
                      color: '#ffffff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '0.875rem',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.5rem',
                        gap: '1rem'
                      }}>
                        <h4 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: '#111827',
                          lineHeight: '1.3'
                        }}>
                          {step.title}
                        </h4>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: step.priority === 'urgent' ? '#dc2626' : step.priority === 'high' ? '#2563eb' : '#6b7280',
                          backgroundColor: step.priority === 'urgent' ? '#fee2e2' : step.priority === 'high' ? '#eff6ff' : '#f3f4f6',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          whiteSpace: 'nowrap'
                        }}>
                          {step.timeframe}
                        </span>
                      </div>
                      <p style={{
                        color: '#4b5563',
                        lineHeight: '1.6',
                        fontSize: '0.9375rem'
                      }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA Section */}
              <div style={{
                backgroundColor: 'linear-gradient(135deg, #eff6ff 0%, #f3f4f6 100%)',
                background: 'linear-gradient(135deg, #eff6ff 0%, #f3f4f6 100%)',
                padding: '2rem',
                borderRadius: '1rem',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Ready for Your Complete Roadmap?
                </h3>
                <p style={{
                  color: '#4b5563',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  Get access to your full personalized plan, progress tracker, and step-by-step guidance to move to Stage {results.stage.id < 8 ? results.stage.id + 1 : 'optimization'}.
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  alignItems: 'center'
                }}>
                  <Link href="/pricing">
                    <button className="btn btn-primary btn-lg" style={{
                      minWidth: '250px',
                      fontSize: '1.125rem'
                    }}>
                      Get Your Full Roadmap - $9/month
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="btn btn-outline" style={{
                      minWidth: '250px'
                    }}>
                      Create Free Account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{
        paddingTop: '3rem',
        paddingBottom: '5rem',
        backgroundColor: '#f9fafb'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: '#6b7280',
              marginBottom: '1.5rem',
              fontSize: '1rem'
            }}>
              Join thousands of others taking control of their finances
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              fontSize: '0.875rem',
              color: '#9ca3af'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                Cancel anytime
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                No hidden fees
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                Built for real people
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}