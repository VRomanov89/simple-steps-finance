'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuizForm from '@/components/quiz/QuizForm';
import EmailCapture from '@/components/quiz/EmailCapture';

type QuizState = 'intro' | 'questions' | 'email' | 'processing';

interface QuizResults {
  answers: any[];
  totalScore: number;
  stage: any;
}

export default function QuizPage() {
  const [state, setState] = useState<QuizState>('intro');
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const router = useRouter();

  const handleStartQuiz = () => {
    setState('questions');
  };

  const handleQuizComplete = (results: QuizResults) => {
    setQuizResults(results);
    setState('email');
  };

  const handleEmailSubmit = async (email: string) => {
    setState('processing');
    
    try {
      const resultsWithEmail = {
        ...quizResults,
        email,
      };

      // Store quiz results and email in local storage
      localStorage.setItem('quizResults', JSON.stringify(resultsWithEmail));

      // Send email with results
      try {
        const response = await fetch('/api/send-quiz-results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            stage: quizResults?.stage,
            totalScore: quizResults?.totalScore,
            nextSteps: [] // Will be populated by the API based on stage
          }),
        });

        if (!response.ok) {
          console.warn('Failed to send email, but continuing to results page');
        }
      } catch (emailError) {
        console.warn('Email sending failed:', emailError);
        // Continue to results page even if email fails
      }

      // Redirect to results page
      router.push('/results');
    } catch (error) {
      console.error('Error processing quiz:', error);
      setState('email'); // Go back to email state on error
    }
  };

  const benefits = [
    {
      icon: '⚡',
      title: 'Takes less than 3 minutes',
      description: 'Quick and easy questions designed for busy people'
    },
    {
      icon: '🔒',
      title: 'No bank logins required',
      description: 'We protect your privacy - no sensitive data needed'
    },
    {
      icon: '🎯',
      title: 'Personalized results',
      description: 'Get your unique financial stage and custom roadmap'
    },
    {
      icon: '📈',
      title: 'Actionable next steps',
      description: 'Clear guidance on exactly what to do next'
    }
  ];

  if (state === 'questions') {
    return <QuizForm onComplete={handleQuizComplete} />;
  }

  if (state === 'email') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div style={{ maxWidth: '32rem', width: '100%', textAlign: 'center' }}>
          <div style={{
            width: '5rem',
            height: '5rem',
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{ fontSize: '2rem' }}>🎉</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Assessment Complete!
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#4b5563',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            You're ready to discover your financial stage and get your personalized roadmap to success.
          </p>
          <EmailCapture 
            onSubmit={handleEmailSubmit}
            loading={state === 'processing'}
          />
        </div>
      </div>
    );
  }

  if (state === 'processing') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div style={{ maxWidth: '28rem', width: '100%' }}>
          <div className="card card-elevated" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              position: 'relative'
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                border: '3px solid #ffffff',
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
            
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '0.75rem'
            }}>
              Analyzing Your Results...
            </h2>
            <p style={{
              color: '#4b5563',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              We're calculating your financial stage and preparing your personalized roadmap. This will just take a moment.
            </p>
            
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{
                height: '0.5rem',
                backgroundColor: '#e5e7eb',
                borderRadius: '0.25rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  borderRadius: '0.25rem',
                  width: '75%',
                  animation: 'progressLoad 3s ease-in-out infinite'
                }} />
              </div>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              Creating your personalized financial roadmap...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
      paddingTop: '2rem',
      paddingBottom: '4rem'
    }}>
      <div className="container" style={{ maxWidth: '64rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '5rem',
            height: '5rem',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{ fontSize: '2rem' }}>💰</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Discover Your
            <span style={{ 
              display: 'block',
              color: '#2563eb',
              marginTop: '0.5rem'
            }}>
              Financial Stage
            </span>
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: '#4b5563',
            maxWidth: '48rem',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            Take our free assessment to find out where you are on your financial journey and get a 
            <span style={{ fontWeight: '600', color: '#1f2937' }}> personalized roadmap</span> to reach your goals.
          </p>
        </div>

        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div className="card card-elevated" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Here's what you'll get:
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {benefits.map((benefit, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '1.125rem' }}>{benefit.icon}</span>
                  </div>
                  <div>
                    <h3 style={{
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.25rem',
                      fontSize: '1rem'
                    }}>
                      {benefit.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#4b5563',
                      lineHeight: '1.5'
                    }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleStartQuiz}
              className="btn btn-primary btn-lg"
              style={{ 
                width: '100%',
                marginBottom: '1rem',
                fontSize: '1.125rem',
                padding: '1rem 2rem'
              }}
            >
              Start My Free Assessment
            </button>
            
            <p style={{
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              No spam, no sales pitches. Just helpful financial guidance.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
              100% Free
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
              No Credit Card
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
              Instant Results
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes progressLoad {
          0%, 100% { width: 25%; }
          50% { width: 75%; }
        }
      `}</style>
    </div>
  );
}