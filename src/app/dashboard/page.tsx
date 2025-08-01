'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';

interface UserData {
  stage: {
    id: number;
    label: string;
    description: string;
    next_steps?: {
      steps: string[];
    };
  };
  quiz_score: number;
  roadmap_progress: Record<string, any>;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from your API
    // For now, we'll simulate with mock data
    if (isLoaded && user) {
      setTimeout(() => {
        setUserData({
          stage: {
            id: 3,
            label: 'Budget Beginner',
            description: 'Building structure, new to tracking',
            next_steps: {
              steps: [
                'Create a zero-based budget',
                'Track expenses weekly',
                'Save first $1,000 emergency fund',
                'Pay more than minimums on smallest debt',
                'Automate bill payments'
              ]
            }
          },
          quiz_score: 11,
          roadmap_progress: {
            completed_steps: ['Create a zero-based budget'],
            current_step: 'Track expenses weekly'
          }
        });
        setLoading(false);
      }, 1000);
    }
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SimpleStepsFinance!</h2>
          <p className="text-gray-600 mb-6">
            It looks like you haven't taken our financial assessment quiz yet. Let's get started!
          </p>
          <Link href="/quiz">
            <Button className="w-full">Take the Quiz</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getStageColor = (stageId: number) => {
    if (stageId <= 2) return 'bg-red-100 text-red-800 border-red-200';
    if (stageId <= 4) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (stageId <= 6) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const completedSteps = userData.roadmap_progress.completed_steps || [];
  const totalSteps = userData.stage.next_steps?.steps.length || 5;
  const progressPercentage = (completedSteps.length / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'there'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your personalized financial roadmap and progress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Current Stage */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Your Current Stage</h2>
                  <div className={`px-4 py-2 rounded-full border-2 font-semibold ${getStageColor(userData.stage.id)}`}>
                    Stage {userData.stage.id}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {userData.stage.label}
                </h3>
                <p className="text-gray-600 mb-4">
                  {userData.stage.description}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Progress to Next Stage</span>
                    <span className="text-sm font-medium text-gray-600">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="bg-primary-500 h-3 rounded-full"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Action Items */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Action Plan</h2>
                
                <div className="space-y-4">
                  {userData.stage.next_steps?.steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step);
                    const isCurrent = userData.roadmap_progress.current_step === step;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                          isCompleted 
                            ? 'bg-green-50 border-green-200' 
                            : isCurrent 
                            ? 'bg-primary-50 border-primary-200' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isCurrent 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <p className={`font-medium ${
                            isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
                          }`}>
                            {step}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-primary-600 mt-1">← You are here</p>
                          )}
                        </div>
                        
                        {!isCompleted && (
                          <Button size="sm" variant="outline">
                            Mark Complete
                          </Button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quiz Score</span>
                    <span className="font-semibold text-gray-900">{userData.quiz_score}/24</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Steps Completed</span>
                    <span className="font-semibold text-gray-900">{completedSteps.length}/{totalSteps}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Stage</span>
                    <span className="font-semibold text-gray-900">{userData.stage.id}/8</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Helpful Resources</h3>
                
                <div className="space-y-3">
                  <Link href="/resources" className="block text-primary-600 hover:text-primary-700 transition-colors">
                    📚 Budgeting Templates
                  </Link>
                  <Link href="/resources" className="block text-primary-600 hover:text-primary-700 transition-colors">
                    💡 Debt Payoff Calculator
                  </Link>
                  <Link href="/resources" className="block text-primary-600 hover:text-primary-700 transition-colors">
                    🎯 Goal Setting Worksheet
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    🔄 Retake Quiz
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📊 View Progress Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ⚙️ Account Settings
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}