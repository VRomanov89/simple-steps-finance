'use client';

import { useState, useEffect } from 'react';

interface DebugInfo {
  hasResendKey: boolean;
  resendKeyLength: string;
  nodeEnv: string;
  vercelEnv?: string;
  timestamp: string;
}

export default function DebugEmailPage() {
  const [email, setEmail] = useState('');
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [envLoading, setEnvLoading] = useState(true);

  // Load environment debug info on mount
  useEffect(() => {
    fetch('/api/debug-email')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDebugInfo(data.debug);
        }
      })
      .catch(error => console.error('Failed to load debug info:', error))
      .finally(() => setEnvLoading(false));
  }, []);

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/debug-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setTestResult(data);
      
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Network error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testQuizFlow = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/send-quiz-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          stage: { id: 3, label: 'Budget Beginner', description: 'Test stage for debugging' },
          totalScore: 15
        }),
      });

      const data = await response.json();
      setTestResult({
        ...data,
        testType: 'Quiz Flow Test'
      });
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Quiz flow test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        testType: 'Quiz Flow Test'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div className="card card-elevated" style={{
          padding: '2.5rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '1.5rem'
          }}>
            Email Debug Center
          </h1>
          
          <p style={{
            color: '#4b5563',
            marginBottom: '2rem'
          }}>
            Use this page to diagnose email sending issues. Follow the steps below to identify problems.
          </p>

          {/* Environment Info */}
          <div style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '0.5rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Environment Status
            </h3>
            
            {envLoading ? (
              <p>Loading environment info...</p>
            ) : debugInfo ? (
              <div style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Resend API Key:</strong> {debugInfo.hasResendKey ? 
                    <span style={{ color: '#10b981' }}>✓ Found ({debugInfo.resendKeyLength})</span> : 
                    <span style={{ color: '#ef4444' }}>✗ Missing</span>
                  }
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Environment:</strong> {debugInfo.nodeEnv || 'unknown'}
                </div>
                {debugInfo.vercelEnv && (
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Vercel Env:</strong> {debugInfo.vercelEnv}
                  </div>
                )}
                <div>
                  <strong>Last Check:</strong> {new Date(debugInfo.timestamp).toLocaleString()}
                </div>
              </div>
            ) : (
              <p style={{ color: '#ef4444' }}>Failed to load environment info</p>
            )}
          </div>

          {/* Test Form */}
          <form onSubmit={handleTestEmail} style={{
            marginBottom: '2rem'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Test Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email for testing"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? 'Testing...' : 'Test Debug Email'}
              </button>

              <button
                type="button"
                onClick={testQuizFlow}
                disabled={isLoading || !email}
                className="btn btn-secondary"
                style={{
                  opacity: (isLoading || !email) ? 0.7 : 1,
                  cursor: (isLoading || !email) ? 'not-allowed' : 'pointer'
                }}
              >
                Test Quiz Email Flow
              </button>
            </div>
          </form>

          {/* Results */}
          {testResult && (
            <div style={{
              padding: '1.5rem',
              borderRadius: '0.5rem',
              backgroundColor: testResult.success ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${testResult.success ? '#86efac' : '#fecaca'}`,
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: testResult.success ? '#166534' : '#991b1b',
                marginBottom: '1rem'
              }}>
                {testResult.testType || 'Test'} Result: {testResult.success ? 'SUCCESS' : 'FAILED'}
              </h3>
              
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                backgroundColor: 'rgba(0,0,0,0.05)',
                padding: '1rem',
                borderRadius: '0.25rem',
                overflow: 'auto'
              }}>
                <pre>{JSON.stringify(testResult, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#eff6ff',
            borderRadius: '0.5rem',
            border: '1px solid #93c5fd'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '1rem'
            }}>
              Troubleshooting Steps
            </h3>
            
            <ol style={{
              color: '#1e40af',
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              paddingLeft: '1.5rem'
            }}>
              <li><strong>Check Environment:</strong> Ensure RESEND_API_KEY is set in your environment variables</li>
              <li><strong>Test Debug Email:</strong> Use the button above to test basic email functionality</li>
              <li><strong>Test Quiz Flow:</strong> Test the actual quiz email flow with the second button</li>
              <li><strong>Check Spam:</strong> Always check your spam/junk folder</li>
              <li><strong>Verify Domain:</strong> Ensure your sending domain is verified with Resend</li>
              <li><strong>Check Logs:</strong> Look at your deployment logs for any error messages</li>
            </ol>
            
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              borderRadius: '0.25rem'
            }}>
              <strong>Next Steps:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                <li>If environment shows "Resend API Key: ✗ Missing", add RESEND_API_KEY to your environment</li>
                <li>If tests fail, check the error details in the JSON output above</li>
                <li>If successful but no email received, check spam folder and Resend dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}