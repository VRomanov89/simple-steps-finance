'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} reset={this.handleReset} />;
      }

      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{
            maxWidth: '32rem',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '0.75rem',
            padding: '2rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            </div>
            
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              Something went wrong
            </h1>
            
            <p style={{
              color: '#4b5563',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              We encountered an error while loading the application.
            </p>

            <details style={{
              backgroundColor: '#f3f4f6',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Error Details
              </summary>
              <pre style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                whiteSpace: 'pre-wrap',
                overflow: 'auto'
              }}>
                {this.state.error?.message}
                {this.state.error?.stack && '\n\nStack trace:\n' + this.state.error.stack}
              </pre>
            </details>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={this.handleReset}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;