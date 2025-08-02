'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Take Quiz', href: '/quiz' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Dashboard', href: '/dashboard' },
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ],
    Support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer style={{
      backgroundColor: '#111827',
      color: '#ffffff'
    }}>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
              textDecoration: 'none'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <span style={{
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '1.125rem'
                }}>$</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontWeight: '700',
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  letterSpacing: '-0.025em'
                }}>Simple Steps Finance</span>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginTop: '-0.125rem'
                }}>Master Your Money</span>
              </div>
            </Link>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              maxWidth: '20rem',
              lineHeight: '1.5'
            }}>
              Master your money, one simple step at a time. No spreadsheets, no judgment, just progress toward financial freedom.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#9ca3af',
                  transition: 'all 0.2s ease-in-out',
                  padding: '0.5rem',
                  borderRadius: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = '#9ca3af';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ 
                  position: 'absolute', 
                  width: '1px', 
                  height: '1px', 
                  padding: 0, 
                  margin: '-1px', 
                  overflow: 'hidden', 
                  clip: 'rect(0, 0, 0, 0)', 
                  whiteSpace: 'nowrap', 
                  border: 0 
                }}>Twitter</span>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#9ca3af',
                  transition: 'all 0.2s ease-in-out',
                  padding: '0.5rem',
                  borderRadius: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = '#9ca3af';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ 
                  position: 'absolute', 
                  width: '1px', 
                  height: '1px', 
                  padding: 0, 
                  margin: '-1px', 
                  overflow: 'hidden', 
                  clip: 'rect(0, 0, 0, 0)', 
                  whiteSpace: 'nowrap', 
                  border: 0 
                }}>LinkedIn</span>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 style={{
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '1rem',
                fontSize: '1rem'
              }}>{category}</h3>
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      style={{
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease-in-out',
                        display: 'inline-block',
                        padding: '0.25rem 0'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#ffffff';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#9ca3af';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%'
          }}>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              textAlign: 'center'
            }}>
              © {currentYear} Simple Steps Finance. All rights reserved.
            </p>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <Link 
                href="/privacy" 
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease-in-out'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = '#9ca3af';
                }}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease-in-out'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = '#9ca3af';
                }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}