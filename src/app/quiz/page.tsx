'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import QuizForm from '@/components/quiz/QuizForm';
import EmailCapture from '@/components/quiz/EmailCapture';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

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
      // Store quiz results and email in local storage temporarily
      localStorage.setItem('quizResults', JSON.stringify({
        ...quizResults,
        email,
      }));

      // Redirect to results page
      router.push('/results');
    } catch (error) {
      console.error('Error processing quiz:', error);
      // Handle error appropriately
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {state === 'intro' && (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover Your
                <span className="text-blue-600 block">
                  Financial Stage
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Take our free assessment to find out where you are on your financial journey and get a 
                <span className="font-semibold text-gray-800"> personalized roadmap</span> to reach your goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <Card variant="elevated" padding="lg" className="text-left max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Here's what you'll get:
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{benefit.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button 
                  onClick={handleStartQuiz} 
                  fullWidth 
                  size="lg"
                  className="mb-4"
                >
                  Start My Free Assessment
                </Button>
                
                <p className="text-center text-sm text-gray-500">
                  No spam, no sales pitches. Just helpful financial guidance.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-8 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                100% Free
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                No Credit Card
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Instant Results
              </div>
            </motion.div>
          </div>
        )}

        {state === 'questions' && (
          <QuizForm onComplete={handleQuizComplete} />
        )}

        {state === 'email' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
                <span className="text-3xl">🎉</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Assessment Complete!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                You're ready to discover your financial stage and get your personalized roadmap to success.
              </p>
            </div>
            <EmailCapture 
              onSubmit={handleEmailSubmit}
              loading={state === 'processing'}
            />
          </motion.div>
        )}

        {state === 'processing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <Card variant="elevated" padding="xl">
              <div className="mb-6">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 1, repeat: Infinity }
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </motion.div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Analyzing Your Results...
              </h2>
              <p className="text-gray-600 mb-6">
                We're calculating your financial stage and preparing your personalized roadmap. This will just take a moment.
              </p>
              
              <div className="space-y-2">
                <motion.div 
                  className="h-2 bg-gray-200 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                  />
                </motion.div>
                <p className="text-sm text-gray-500">
                  Creating your personalized financial roadmap...
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}