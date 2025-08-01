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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {state === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Where Do You Stand Financially?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Take this quick quiz to find out your current financial stage and get a personalized plan to move forward — without shame, spreadsheets, or overwhelm.
            </p>

            <Card className="text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Before we begin:
              </h2>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>
                  Takes less than 3 minutes
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>
                  No bank logins or sensitive data required
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>
                  Your results are private and personalized
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>
                  Get your financial stage and next steps
                </li>
              </ul>

              <Button onClick={handleStartQuiz} className="w-full" size="lg">
                Start My Free Quiz
              </Button>
            </Card>
          </motion.div>
        )}

        {state === 'questions' && (
          <QuizForm onComplete={handleQuizComplete} />
        )}

        {state === 'email' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Quiz Complete! 🎉
              </h1>
              <p className="text-lg text-gray-600">
                You're ready to see your financial stage and get your personalized roadmap.
              </p>
            </div>
            <EmailCapture 
              onSubmit={handleEmailSubmit}
              loading={state === 'processing'}
            />
          </div>
        )}

        {state === 'processing' && (
          <div className="max-w-md mx-auto text-center">
            <Card>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Analyzing Your Results...
              </h2>
              <p className="text-gray-600">
                We're calculating your financial stage and preparing your personalized roadmap.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}