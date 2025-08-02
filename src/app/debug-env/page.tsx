'use client';

export default function DebugEnv() {
  const envVars = {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Environment Variables Debug</h1>
      <pre style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '4px',
        whiteSpace: 'pre-wrap'
      }}>
        {JSON.stringify(envVars, null, 2)}
      </pre>
    </div>
  );
}