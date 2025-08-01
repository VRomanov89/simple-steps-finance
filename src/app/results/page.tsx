'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

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
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return null; // Will redirect
  }

  const getStageColor = (stageId: number) => {
    if (stageId <= 2) return 'bg-red-100 text-red-800 border-red-200';
    if (stageId <= 4) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (stageId <= 6) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getNextSteps = (stage: any) => {
    if (stage.next_steps && stage.next_steps.steps) {
      return stage.next_steps.steps.slice(0, 3); // Show first 3 steps
    }
    return [
      'Create a basic budget to track your spending',
      'List all your debts and their minimum payments',
      'Start building a small emergency fund'
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6"
          >
            <span className="text-4xl">🎯</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            You're at Stage {results.stage.id}:
          </h1>
          
          <div className={`inline-flex px-6 py-3 rounded-full border-2 text-xl font-semibold mb-6 ${getStageColor(results.stage.id)}`}>
            {results.stage.label}
          </div>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {results.stage.description}
          </p>
        </motion.div>

        {/* Results Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* What This Means */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Means</h2>
              <p className="text-gray-600 leading-relaxed">
                {results.stage.id <= 2 && "You're in the early stages of your financial journey. This is actually a great place to start because now you know exactly where you stand. Many people never take this important first step."}
                {results.stage.id > 2 && results.stage.id <= 4 && "You're making real progress! You've moved beyond survival mode and are starting to build good financial habits. This is where momentum really begins."}
                {results.stage.id > 4 && results.stage.id <= 6 && "You're doing great! You've built a solid foundation and are now in the growth phase of your financial journey. Keep up the excellent work."}
                {results.stage.id > 6 && "Congratulations! You're in the advanced stages of financial success. You're well on your way to or have already achieved financial independence."}
              </p>
            </Card>
          </motion.div>

          {/* Your Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Score</h2>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-primary-600">{results.totalScore}</div>
                <div className="text-gray-500">out of 24 points</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(results.totalScore / 24) * 100}%` }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="bg-primary-500 h-3 rounded-full"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                You scored higher than {Math.round(((results.totalScore / 24) * 70) + 10)}% of people who take this quiz
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Next Steps</h2>
            <div className="space-y-4">
              {getNextSteps(results.stage).map((step: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="ml-4 text-gray-700">{step}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-600 mb-4">
                <strong>Ready for your complete roadmap?</strong> Get access to your full personalized plan, progress tracker, and step-by-step guidance to move to Stage {results.stage.id + 1}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pricing" className="flex-1">
                  <Button className="w-full">
                    Get Your Full Roadmap - $9/month
                  </Button>
                </Link>
                <Link href="/sign-up" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-gray-500 mb-4">Join thousands of others taking control of their finances</p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>✓ Cancel anytime</span>
            <span>✓ No hidden fees</span>
            <span>✓ Built for real people</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}