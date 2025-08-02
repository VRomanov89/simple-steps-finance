'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useUser();

  const features = [
    {
      icon: '🎯',
      title: 'Personalized Financial Roadmap',
      description: 'Get a custom plan based on your unique financial situation and goals. No generic advice.'
    },
    {
      icon: '📊',
      title: 'Track Your Progress',
      description: 'See your journey with clear milestones, achievements, and next steps. Stay motivated with visual progress.'
    },
    {
      icon: '🚫',
      title: 'No Bank Connections Required',
      description: 'Keep your financial data private. We focus on behavior and guidance, not accessing your accounts.'
    },
    {
      icon: '💡',
      title: 'Simple, Actionable Steps',
      description: 'No financial jargon or complex spreadsheets. Just clear, simple steps anyone can follow.'
    },
    {
      icon: '🏆',
      title: 'Celebrate Small Wins',
      description: 'Build momentum with achievement tracking and milestone celebrations. Every step counts.'
    },
    {
      icon: '📚',
      title: 'Educational Resources',
      description: 'Learn as you go with guides, tips, and resources tailored to your current financial stage.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      stage: 'Stage 5: Investment Ready',
      quote: 'Finally, a financial plan that makes sense for real people. I went from stressed about money to confident in just 3 months.',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike R.',
      stage: 'Stage 3: Budget Builder',
      quote: 'The step-by-step approach made it so much less overwhelming. I actually look forward to checking my progress now.',
      avatar: '👨‍💻'
    },
    {
      name: 'Jessica L.',
      stage: 'Stage 6: Wealth Builder',
      quote: 'Love that it meets me where I am without judgment. The personalized roadmap has been a game-changer.',
      avatar: '👩‍🎨'
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        paddingTop: '5rem',
        paddingBottom: '6rem',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              Master Your Money,
              <span style={{ 
                display: 'block',
                color: '#2563eb',
                marginTop: '0.5rem'
              }}>
                One Simple Step
              </span>
              at a Time
            </h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto 2.5rem auto',
              lineHeight: '1.6'
            }}>
              Take our free 3-minute quiz to discover your financial stage and get a personalized roadmap to financial freedom.
              <span style={{ fontWeight: '600', color: '#1f2937' }}> No spreadsheets, no judgment, just progress.</span>
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '3rem'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <Link href={isSignedIn ? '/dashboard' : '/quiz'}>
                  <button className="btn btn-primary btn-lg" style={{ minWidth: '200px' }}>
                    {isSignedIn ? 'Go to Dashboard' : 'Start Your Free Quiz'}
                  </button>
                </Link>
                <Link href="#how-it-works">
                  <button className="btn btn-outline btn-lg" style={{ minWidth: '180px' }}>
                    See How It Works
                  </button>
                </Link>
              </div>
              {!isSignedIn && (
                <p style={{
                  marginTop: '1rem',
                  fontSize: '0.9375rem',
                  color: '#6b7280'
                }}>
                  Already have an account?{' '}
                  <Link href="/sign-in" style={{
                    color: '#2563eb',
                    fontWeight: '500',
                    textDecoration: 'none',
                    borderBottom: '1px solid transparent',
                    transition: 'border-color 0.2s ease-in-out'
                  }}
                  onMouseOver={(e) => e.target.style.borderBottom = '1px solid #2563eb'}
                  onMouseOut={(e) => e.target.style.borderBottom = '1px solid transparent'}
                  >
                    Sign in here
                  </Link>
                </p>
              )}
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
                Free forever
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                No bank login required
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                3-minute setup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" style={{ 
        paddingTop: '6rem', 
        paddingBottom: '6rem', 
        backgroundColor: '#f9fafb' 
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Why SimpleSteps Finance Works
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              We've designed a system that meets you exactly where you are and guides you step-by-step to where you want to be.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} className="card" style={{
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.6',
                  flexGrow: 1
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ 
        paddingTop: '6rem', 
        paddingBottom: '6rem', 
        backgroundColor: '#ffffff' 
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Real People, Real Progress
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              Join thousands who are transforming their financial lives with our step-by-step approach.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card" style={{
                height: '100%',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #eff6ff 0%, #f3f4f6 100%)',
                border: 'none'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {testimonial.avatar}
                </div>
                <blockquote style={{
                  color: '#374151',
                  marginBottom: '1rem',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  "{testimonial.quote}"
                </blockquote>
                <div style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                  {testimonial.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: '500' }}>
                  {testimonial.stage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: '#ffffff'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '64rem', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}>
              Ready to Take Control of Your Finances?
            </h2>
            <p style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              marginBottom: '2.5rem',
              opacity: '0.9'
            }}>
              Join thousands of people who are building better financial futures, one simple step at a time.
            </p>
            <Link href={isSignedIn ? '/dashboard' : '/quiz'}>
              <button style={{
                backgroundColor: '#ffffff',
                color: '#2563eb',
                padding: '0.75rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '500',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease-in-out',
                marginBottom: '1rem'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}>
                {isSignedIn ? 'Continue Your Journey' : 'Start Your Free Quiz Now'}
              </button>
            </Link>
            <p style={{
              fontSize: '0.875rem',
              opacity: '0.75',
              marginTop: '1rem'
            }}>
              Free forever • No credit card required • 3-minute setup
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
