'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS, getStageFromScore } from '@/constants/quiz';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface QuizAnswer {
  questionId: number;
  answer: string;
  score: number;
}

interface QuizFormProps {
  onComplete: (results: { answers: QuizAnswer[]; totalScore: number; stage: any }) => void;
}

export default function QuizForm({ onComplete }: QuizFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const option = question.options[selectedOption];
    const answer: QuizAnswer = {
      questionId: question.id,
      answer: option.text,
      score: option.score,
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion === QUIZ_QUESTIONS.length - 1) {
      // Quiz completed
      const totalScore = newAnswers.reduce((sum, ans) => sum + ans.score, 0);
      const stage = getStageFromScore(totalScore);
      onComplete({ answers: newAnswers, totalScore, stage });
    } else {
      // Go to next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedOption === index
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.text}</span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        selectedOption === index
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedOption === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full rounded-full bg-white transform scale-50"
                        />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedOption === null}
              >
                {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Complete Quiz' : 'Next'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}