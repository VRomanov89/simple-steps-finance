'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Master Your Money,
                <span className="text-blue-600 block">
                  One Simple Step
                </span>
                at a Time
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Take our free 3-minute quiz to discover your financial stage and get a personalized roadmap to financial freedom. 
                <span className="font-semibold text-gray-800"> No spreadsheets, no judgment, just progress.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href={isSignedIn ? '/dashboard' : '/quiz'}>
                <Button size="lg" className="text-lg px-8 py-4 shadow-lg hover:shadow-xl">
                  {isSignedIn ? 'Go to Dashboard' : 'Start Your Free Quiz'}
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-gray-50">
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center space-x-8 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Free forever
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                No bank login required
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                3-minute setup
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why SimpleSteps Finance Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've designed a system that meets you exactly where you are and guides you step-by-step to where you want to be.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Real People, Real Progress
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands who are transforming their financial lives with our step-by-step approach.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-blue-600 font-medium">{testimonial.stage}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Join thousands of people who are building better financial futures, one simple step at a time.
            </p>
            <Link href={isSignedIn ? '/dashboard' : '/quiz'}>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {isSignedIn ? 'Continue Your Journey' : 'Start Your Free Quiz Now'}
              </Button>
            </Link>
            <p className="text-sm mt-4 opacity-75">
              Free forever • No credit card required • 3-minute setup
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
