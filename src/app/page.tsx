'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
          >
            Master Your Money,{' '}
            <span className="text-gradient">One Simple Step</span> at a Time
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Take our free quiz to discover your financial stage and get your personalized roadmap to financial freedom.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/quiz">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Free Quiz
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              See How It Works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why SimpleStepsFinance Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlike other finance apps that overwhelm you with features, we provide a clear, step-by-step path to financial success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Built for Real People</h3>
                <p className="text-gray-600">
                  No finance jargon or complex spreadsheets. Just simple, actionable steps anyone can follow.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚫</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Shame or Judgment</h3>
                <p className="text-gray-600">
                  We meet you where you are, without judgment. Every financial journey starts with a single step.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Step-by-Step Progress</h3>
                <p className="text-gray-600">
                  Track your progress with clear milestones and celebrate every win along your financial journey.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started on your financial journey in just four simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Take the Quiz', desc: 'Answer 8 simple questions about your current financial situation.' },
              { step: '2', title: 'See Your Stage', desc: 'Discover which of our 8 financial stages you\'re currently in.' },
              { step: '3', title: 'Get Your Roadmap', desc: 'Receive a personalized action plan to move to the next stage.' },
              { step: '4', title: 'Track Progress', desc: 'Follow your roadmap and celebrate milestones along the way.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Stages Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Which Stage Are You In?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our 8-stage system helps you understand exactly where you are and what to do next.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stage: '1', title: 'Buried in Debt', color: 'bg-red-100 text-red-800' },
              { stage: '3', title: 'Budget Beginner', color: 'bg-yellow-100 text-yellow-800' },
              { stage: '5', title: 'Safety Net Builder', color: 'bg-blue-100 text-blue-800' },
              { stage: '8', title: 'FIRE Ready', color: 'bg-green-100 text-green-800' },
            ].map((item, index) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${item.color} mb-3`}>
                    Stage {item.stage}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/quiz">
              <Button size="lg">
                See Which Stage You're In
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of people who are transforming their financial lives, one simple step at a time.
            </p>
            <Link href="/quiz">
              <Button variant="secondary" size="lg">
                Start Your Free Quiz Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
