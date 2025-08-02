'use client';

import { useState } from 'react';
import { QUIZ_QUESTIONS, getStageFromScore } from '@/constants/quiz';

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
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      // Go to next question with smooth transition
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setAnswers(answers.slice(0, -1));
        setSelectedOption(null);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '40rem', width: '100%' }}>
        {/* Progress Section */}
        <div style={{ 
          marginBottom: '2rem',
          textAlign: 'center' 
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#6b7280',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              <div style={{
                width: '1.5rem',
                height: '1.5rem',
                backgroundColor: '#2563eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {currentQuestion + 1}
              </div>
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </div>
            <div style={{
              color: '#2563eb',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              {Math.round(progress)}% Complete
            </div>
          </div>
          
          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '0.5rem',
            backgroundColor: '#e5e7eb',
            borderRadius: '0.25rem',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '0.25rem',
              width: `${progress}%`,
              transition: 'width 0.5s ease-in-out',
              boxShadow: '0 1px 2px 0 rgba(37, 99, 235, 0.3)'
            }} />
          </div>
          
          {/* Step indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.75rem'
          }}>
            {QUIZ_QUESTIONS.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  backgroundColor: index <= currentQuestion ? '#2563eb' : '#d1d5db',
                  transition: 'all 0.3s ease-in-out'
                }}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div 
          className="card card-elevated" 
          style={{
            padding: '2.5rem',
            opacity: isTransitioning ? 0.5 : 1,
            transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: '700',
              color: '#111827',
              lineHeight: '1.4',
              marginBottom: '0.5rem'
            }}>
              {question.question}
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              Choose the option that best describes your situation
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  marginBottom: '0.75rem',
                  textAlign: 'left',
                  borderRadius: '0.75rem',
                  border: selectedOption === index ? '2px solid #2563eb' : '2px solid #e5e7eb',
                  backgroundColor: selectedOption === index ? 'rgba(37, 99, 235, 0.05)' : '#ffffff',
                  color: selectedOption === index ? '#1e40af' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '1rem',
                  fontWeight: '500',
                  boxShadow: selectedOption === index ? '0 4px 6px -1px rgba(37, 99, 235, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
                onMouseOver={(e) => {
                  if (selectedOption !== index) {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.backgroundColor = '#f9fafb';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedOption !== index) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                  }
                }}
              >
                <span>{option.text}</span>
                <div style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '50%',
                  border: selectedOption === index ? '2px solid #2563eb' : '2px solid #d1d5db',
                  backgroundColor: selectedOption === index ? '#2563eb' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease-in-out',
                  flexShrink: 0
                }}>
                  {selectedOption === index && (
                    <div style={{
                      width: '0.375rem',
                      height: '0.375rem',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%'
                    }} />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn btn-outline"
              style={{
                minWidth: '100px',
                opacity: currentQuestion === 0 ? 0.5 : 1,
                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="btn btn-primary"
              style={{
                minWidth: '150px',
                opacity: selectedOption === null ? 0.5 : 1,
                cursor: selectedOption === null ? 'not-allowed' : 'pointer'
              }}
            >
              {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Complete Quiz' : 'Next Question'}
            </button>
          </div>
        </div>

        {/* Question Navigation Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1.5rem'
        }}>
          {QUIZ_QUESTIONS.map((_, index) => (
            <div
              key={index}
              style={{
                width: index === currentQuestion ? '2rem' : '0.75rem',
                height: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: index <= currentQuestion ? '#2563eb' : '#d1d5db',
                transition: 'all 0.3s ease-in-out',
                opacity: index === currentQuestion ? 1 : 0.6
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}