export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#2563eb', fontSize: '3rem', marginBottom: '1rem' }}>
        Master Your Money, One Simple Step at a Time
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
        Take our free quiz to discover your financial stage and get your personalized roadmap to financial freedom.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <a 
          href="/quiz" 
          style={{ 
            background: '#3b82f6', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Start Your Free Quiz
        </a>
        <button 
          style={{ 
            background: 'white', 
            color: '#3b82f6', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            border: '2px solid #3b82f6',
            fontWeight: '500'
          }}
        >
          See How It Works
        </button>
      </div>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Why SimpleStepsFinance Works</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👥</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Built for Real People</h3>
            <p style={{ color: '#6b7280' }}>No finance jargon or complex spreadsheets. Just simple, actionable steps anyone can follow.</p>
          </div>
          
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚫</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>No Shame or Judgment</h3>
            <p style={{ color: '#6b7280' }}>We meet you where you are, without judgment. Every financial journey starts with a single step.</p>
          </div>
          
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📈</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Step-by-Step Progress</h3>
            <p style={{ color: '#6b7280' }}>Track your progress with clear milestones and celebrate every win along your financial journey.</p>
          </div>
        </div>
      </section>

      <div style={{ marginTop: '3rem', padding: '2rem', background: '#3b82f6', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Take Control of Your Finances?</h2>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: '0.9' }}>
          Join thousands of people who are transforming their financial lives, one simple step at a time.
        </p>
        <a 
          href="/quiz" 
          style={{ 
            background: 'white', 
            color: '#3b82f6', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          Start Your Free Quiz Now
        </a>
      </div>
    </div>
  );
}
