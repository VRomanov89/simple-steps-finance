'use client';

import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem'
    }}>
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{ fontSize: '1.5rem' }}>👋</span>
          </div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>
            Welcome back
          </h2>
          <p style={{
            color: '#4b5563',
            fontSize: '1.125rem'
          }}>
            Sign in to continue your financial journey
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary-500 hover:bg-primary-600 text-sm normal-case',
              card: 'shadow-xl border-0 rounded-xl',
              headerTitle: 'font-bold text-xl',
              headerSubtitle: 'text-gray-600',
              formFieldLabel: 'font-medium text-gray-700',
              formFieldInput: 'rounded-lg border-gray-300',
              footerActionLink: 'text-primary-600 hover:text-primary-700',
            },
          }}
        />
      </div>
    </div>
  );
}