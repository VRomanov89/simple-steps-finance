'use client';

import { useState } from 'react';

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
    <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
      <div className="card card-elevated" style={{ padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{ fontSize: '1.875rem' }}>🎉</span>
          </div>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '0.75rem'
          }}>
            You're Almost There!
          </h2>
          <p style={{
            color: '#4b5563',
            lineHeight: '1.6',
            fontSize: '1rem'
          }}>
            Enter your email to unlock your personalized financial roadmap and discover your exact next steps to financial success.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your best email address"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                border: error ? '2px solid #dc2626' : '2px solid #e5e7eb',
                borderRadius: '0.75rem',
                outline: 'none',
                transition: 'all 0.2s ease-in-out',
                backgroundColor: '#ffffff',
                color: '#111827'
              }}
              onFocus={(e) => {
                if (!error) {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }
              }}
              onBlur={(e) => {
                if (!error) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }
              }}
              disabled={loading}
              required
            />
            {error && (
              <p style={{
                color: '#dc2626',
                fontSize: '0.875rem',
                marginTop: '0.5rem',
                textAlign: 'left'
              }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="btn btn-primary btn-lg"
            style={{
              width: '100%',
              fontSize: '1.125rem',
              padding: '1rem 2rem',
              opacity: loading || !email ? 0.5 : 1,
              cursor: loading || !email ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Processing...
              </span>
            ) : (
              'Get My Personalized Roadmap'
            )}
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>
          <span style={{ color: '#10b981' }}>🔒</span>
          <span>100% secure and private</span>
        </div>

        <p style={{
          fontSize: '0.75rem',
          color: '#9ca3af',
          lineHeight: '1.5'
        }}>
          We respect your privacy. No spam, no sales calls, just your personalized financial guidance. Unsubscribe anytime.
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}