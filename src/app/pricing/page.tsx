'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PricingPage() {
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const plans = {
    monthly: {
      price: '$9',
      period: 'month',
      priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
      savings: null,
    },
    yearly: {
      price: '$90',
      period: 'year',
      priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
      savings: 'Save 17% - get 2 months free',
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Financial Roadmap Starts Here
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take control of your money with a personalized plan, simple tools, and steady progress — one step at a time.
          </p>
        </motion.div>

        {/* Plan Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setPlanType('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                planType === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPlanType('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                planType === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
                <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
                <p className="text-gray-500">Forever free</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Access to the financial quiz</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">See your stage and basic summary</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Educational articles and resources</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" onClick={() => router.push('/quiz')}>
                Take Free Quiz
              </Button>
            </Card>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full border-2 border-primary-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pro</h2>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {currentPlan.price}
                </div>
                <p className="text-gray-500">per {currentPlan.period}</p>
                {currentPlan.savings && (
                  <p className="text-green-600 font-medium text-sm mt-1">
                    {currentPlan.savings}
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Full personalized roadmap based on your quiz results</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Progress tracker and next-action reminders</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Milestones and motivational streaks</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Access to all future step content</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Financial wins journaling + insights</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>

              <Button 
                className="w-full" 
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Start Your Journey Now'}
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">
                  Yes — both plans are flexible and risk-free. You can cancel your subscription at any time.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do I need to link my bank?</h3>
                <p className="text-gray-600">
                  No — we focus on behavior and guidance, not banking data. You'll never need to connect your accounts.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is this better than budgeting apps?</h3>
                <p className="text-gray-600">
                  We guide your behavior and mindset — not just your money. Think of us as your financial coach, not another spreadsheet.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What if I'm already good with money?</h3>
                <p className="text-gray-600">
                  Our 8-stage system works for everyone, from those buried in debt to those ready for FIRE. You'll get a plan tailored to your specific stage.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="text-green-500 mr-2">🔒</span>
              Secure payments
            </span>
            <span className="flex items-center">
              <span className="text-green-500 mr-2">💳</span>
              Cancel anytime
            </span>
            <span className="flex items-center">
              <span className="text-green-500 mr-2">📞</span>
              Customer support
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}