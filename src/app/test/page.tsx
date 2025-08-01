export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🚀 SimpleStepsFinance - Deployment Test</h1>
      <p>If you can see this page, the basic Next.js app is working!</p>
      
      <h2>Environment Variables Check:</h2>
      <ul>
        <li>Clerk Publishable Key: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? '✅ Set' : '❌ Missing'}</li>
        <li>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</li>
        <li>Stripe Publishable Key: {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✅ Set' : '❌ Missing'}</li>
        <li>App URL: {process.env.NEXT_PUBLIC_APP_URL || '❌ Not set'}</li>
      </ul>

      <h2>Build Info:</h2>
      <p>Built at: {new Date().toISOString()}</p>
      <p>Node.js Version: {process.version}</p>
    </div>
  );
}