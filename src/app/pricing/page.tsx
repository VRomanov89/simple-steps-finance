'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const plans = {
    monthly: {
      price: 9,
      period: 'month',
      priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
      savings: null,
    },
    yearly: {
      price: 90,
      period: 'year',
      priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
      savings: 'Save 17% - get 2 months free',
      monthlyEquivalent: 7.50,
    },
  };

  const currentPlan = plans[planType];

  const handleSubscribe = async () => {
    if (!isSignedIn) {
      router.push('/sign-up');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: currentPlan.priceId || 'price_placeholder',
          planType,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe Checkout
      const stripe = (await import('@stripe/stripe-js')).loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      const stripeInstance = await stripe;
      
      if (stripeInstance) {
        await stripeInstance.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: '🎯', title: 'Personalized Roadmap', description: 'Custom plan based on your exact financial stage and goals' },
    { icon: '📊', title: 'Progress Tracking', description: 'Visual milestones and streak tracking to keep you motivated' },
    { icon: '💡', title: 'Simple Next Steps', description: 'Clear, actionable tasks without overwhelming financial jargon' },
    { icon: '🏆', title: 'Milestone Rewards', description: 'Celebrate wins and build momentum with achievement tracking' },
    { icon: '📚', title: 'Stage-Specific Content', description: 'Educational resources tailored to your current financial stage' },
    { icon: '🔄', title: 'Continuous Updates', description: 'Your roadmap evolves as your financial situation improves' }
  ];

  const testimonials = [
    { name: 'Sarah M.', stage: 'Stage 5: Investment Ready', quote: 'Finally got control of my money without feeling overwhelmed.', avatar: '👩‍💼' },
    { name: 'Mike R.', stage: 'Stage 3: Budget Builder', quote: 'The step-by-step approach made everything so much clearer.', avatar: '👨‍💻' },
    { name: 'Lisa K.', stage: 'Stage 6: Wealth Builder', quote: 'Love how it meets me where I am without judgment.', avatar: '👩‍🎨' }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        paddingTop: '4rem',
        paddingBottom: '5rem'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              Your Financial Freedom
              <span style={{ 
                display: 'block',
                color: '#2563eb',
                marginTop: '0.5rem'
              }}>
                Starts Here
              </span>
            </h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto 3rem auto',
              lineHeight: '1.6'
            }}>
              Stop struggling with generic financial advice. Get a <span style={{ fontWeight: '600', color: '#1f2937' }}>personalized roadmap</span> that meets you exactly where you are and guides you step-by-step to where you want to be.
            </p>

            {/* Social Proof */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '3rem',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                Trusted by 10,000+ users
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                Average 40% improvement in 90 days
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                No bank connections required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Pay Section */}
      <section style={{ 
        paddingTop: '5rem', 
        paddingBottom: '5rem', 
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
              Why Invest in Your Financial Future?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              Most financial advice treats everyone the same. We create a plan that's uniquely yours.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {benefits.map((benefit, index) => (
              <div key={index} className="card" style={{
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {benefit.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.75rem'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.6',
                  flexGrow: 1
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ 
        paddingTop: '5rem', 
        paddingBottom: '5rem', 
        backgroundColor: '#ffffff'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#4b5563',
              marginBottom: '2rem'
            }}>
              Start free, upgrade when you're ready for your personalized roadmap.
            </p>

            {/* Plan Toggle */}
            <div style={{
              display: 'inline-flex',
              backgroundColor: '#f3f4f6',
              padding: '0.25rem',
              borderRadius: '0.75rem',
              marginBottom: '3rem'
            }}>
              <button
                onClick={() => setPlanType('monthly')}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: planType === 'monthly' ? '#ffffff' : 'transparent',
                  color: planType === 'monthly' ? '#111827' : '#6b7280',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: planType === 'monthly' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setPlanType('yearly')}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: planType === 'yearly' ? '#ffffff' : 'transparent',
                  color: planType === 'yearly' ? '#111827' : '#6b7280',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: planType === 'yearly' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
                  position: 'relative'
                }}
              >
                Yearly
                {planType === 'yearly' && (
                  <span style={{
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '-0.5rem',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontWeight: '600'
                  }}>
                    Save 17%
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '64rem',
            margin: '0 auto'
          }}>
            
            {/* Free Plan */}
            <div className="card" style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Free
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <span style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: '#111827'
                  }}>
                    $0
                  </span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Forever free
                </p>
              </div>

              <div style={{ flexGrow: 1, marginBottom: '2rem' }}>
                <ul style={{ 
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', marginTop: '0.125rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>Financial stage assessment</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', marginTop: '0.125rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>Basic stage summary and insights</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', marginTop: '0.125rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>Educational articles and resources</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => router.push('/quiz')}
                className="btn btn-outline"
                style={{ width: '100%' }}
              >
                Take Free Quiz
              </button>
            </div>

            {/* Pro Plan */}
            <div className="card card-elevated" style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              border: '2px solid #2563eb',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-0.75rem',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '0.25rem 1rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                Most Popular
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  Pro
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <span style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: '#111827'
                  }}>
                    ${planType === 'yearly' ? currentPlan.monthlyEquivalent : currentPlan.price}
                  </span>
                  <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                    /month
                  </span>
                </div>
                {planType === 'yearly' && (
                  <div style={{ marginBottom: '0.5rem' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      Billed annually (${currentPlan.price}/year)
                    </p>
                    <p style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: '500' }}>
                      {currentPlan.savings}
                    </p>
                  </div>
                )}
                {planType === 'monthly' && (
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Billed monthly
                  </p>
                )}
              </div>

              <div style={{ flexGrow: 1, marginBottom: '2rem' }}>
                <ul style={{ 
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', marginTop: '0.125rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>Complete personalized financial roadmap</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', marginTop: '0.125rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>Progress tracking and milestone celebrations</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', marginTop: '0.125rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>Smart next-action reminders</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', marginTop: '0.125rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>Stage-specific educational content</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', marginTop: '0.125rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>Financial wins journaling and insights</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', marginTop: '0.125rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>Priority customer support</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={handleSubscribe}
                disabled={loading}
                className="btn btn-primary"
                style={{ 
                  width: '100%',
                  opacity: loading ? 0.5 : 1
                }}
              >
                {loading ? 'Processing...' : 'Start Your Journey'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ 
        paddingTop: '5rem', 
        paddingBottom: '5rem', 
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
              Real Results from Real People
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card" style={{
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

      {/* FAQ Section */}
      <section style={{ 
        paddingTop: '5rem', 
        paddingBottom: '5rem', 
        backgroundColor: '#ffffff' 
      }}>
        <div className="container">
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <div className="card card-elevated" style={{ padding: '3rem' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Frequently Asked Questions
              </h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
              }}>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem', fontSize: '1.125rem' }}>
                    Can I cancel anytime?
                  </h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    Absolutely. Both plans are flexible and risk-free. You can cancel your subscription at any time with no questions asked.
                  </p>
                </div>
                
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem', fontSize: '1.125rem' }}>
                    Do I need to connect my bank accounts?
                  </h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    Never. We focus on behavior and guidance, not accessing your banking data. Your financial privacy is completely protected.
                  </p>
                </div>
                
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem', fontSize: '1.125rem' }}>
                    How is this different from budgeting apps?
                  </h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    We guide your financial behavior and mindset, not just track your spending. Think of us as your personal financial coach, not another spreadsheet.
                  </p>
                </div>
                
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem', fontSize: '1.125rem' }}>
                    What if I'm already financially stable?
                  </h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    Our 8-stage system works for everyone, from those struggling with debt to those planning for early retirement. You'll get a roadmap tailored to your specific stage and goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: '#ffffff'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}>
              Ready to Transform Your Financial Future?
            </h2>
            <p style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              marginBottom: '2.5rem',
              opacity: '0.9'
            }}>
              Start with our free assessment, then upgrade when you're ready for your personalized roadmap.
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <button 
                onClick={() => router.push('/quiz')}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#2563eb',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease-in-out',
                  minWidth: '200px'
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
                }}
              >
                Start Free Assessment
              </button>
              
              <p style={{
                fontSize: '0.875rem',
                opacity: '0.75'
              }}>
                Free forever • No credit card required • Takes 3 minutes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}