'use client';

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <section style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f3f4f6 100%)',
        paddingTop: '3rem',
        paddingBottom: '4rem'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Privacy Policy
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              lineHeight: '1.6'
            }}>
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      <section style={{
        paddingTop: '3rem',
        paddingBottom: '5rem',
        backgroundColor: '#ffffff'
      }}>
        <div className="container">
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <div className="card" style={{ padding: '3rem' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem'
              }}>
                
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Information We Collect
                  </h2>
                  <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '1rem' }}>
                      We collect information you provide directly to us, such as when you:
                    </p>
                    <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', marginBottom: '1rem' }}>
                      <li>Take our financial assessment quiz</li>
                      <li>Create an account or subscribe to our services</li>
                      <li>Contact us for support or feedback</li>
                      <li>Subscribe to our newsletter</li>
                    </ul>
                    <p>
                      This may include your email address, quiz responses, and any other information you choose to provide.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    How We Use Your Information
                  </h2>
                  <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '1rem' }}>
                      We use the information we collect to:
                    </p>
                    <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', marginBottom: '1rem' }}>
                      <li>Provide personalized financial guidance and recommendations</li>
                      <li>Process your quiz results and determine your financial stage</li>
                      <li>Send you educational content and updates about our services</li>
                      <li>Improve our services and develop new features</li>
                      <li>Respond to your questions and provide customer support</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Information Sharing
                  </h2>
                  <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '1rem' }}>
                      We do not sell, trade, or otherwise transfer your personal information to third parties. We may share your information only in the following limited circumstances:
                    </p>
                    <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', marginBottom: '1rem' }}>
                      <li>With your explicit consent</li>
                      <li>To comply with legal obligations or protect our rights</li>
                      <li>With trusted service providers who help us operate our service (under strict confidentiality agreements)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Data Security
                  </h2>
                  <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <p>
                      We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Your Rights
                  </h2>
                  <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '1rem' }}>
                      You have the right to:
                    </p>
                    <ul style={{ listStyle: 'disc', marginLeft: '1.5rem', marginBottom: '1rem' }}>
                      <li>Access and review your personal information</li>
                      <li>Request corrections to your personal information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Opt out of receiving marketing communications</li>
                      <li>Export your data in a portable format</li>
                    </ul>
                    <p>
                      To exercise these rights, please contact us at support@simplestepsfinance.com
                    </p>
                  </div>
                </div>

                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Cookies and Tracking
                  </h2>
                  <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <p>
                      We use cookies and similar technologies to improve your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Changes to This Policy
                  </h2>
                  <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <p>
                      We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date below.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Contact Us
                  </h2>
                  <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '1rem' }}>
                      If you have any questions about this privacy policy or our data practices, please contact us:
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Email:</strong> support@simplestepsfinance.com
                    </p>
                    <p>
                      <strong>Website:</strong> simplestepsfinance.com
                    </p>
                  </div>
                </div>

                <div style={{
                  paddingTop: '2rem',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    Last Updated: {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}