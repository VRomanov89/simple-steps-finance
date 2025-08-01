'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
  loading?: boolean;
}

export default function EmailCapture({ onSubmit, loading = false }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    onSubmit(email);
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-3xl">🎉</span>
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You're Almost There!</h2>
            <p className="text-gray-600">
              Enter your email to unlock your results and get a simple next-step plan based on your answers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your best email"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={loading}
                required
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !email}
            >
              {loading ? 'Processing...' : 'Get My Results and Next Steps'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              We respect your privacy. No spam, and you can unsubscribe at any time.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}