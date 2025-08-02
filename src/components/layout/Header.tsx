'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Take Quiz', href: '/quiz' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Resources', href: '#resources' },
    ...(isSignedIn ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem'
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              backgroundColor: '#2563eb',
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
                color: '#111827',
                letterSpacing: '-0.025em'
              }}>SimpleSteps</span>
              <span style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                marginTop: '-0.125rem'
              }}>Finance</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem'
          }} className="lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  color: '#4b5563',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease-in-out',
                  position: 'relative',
                  padding: '0.5rem 0'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#2563eb';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = '#4b5563';
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {isSignedIn ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full",
                    userButtonPopoverCard: "shadow-xl border-0",
                    userButtonPopoverActions: "space-y-1"
                  }
                }}
                afterSignOutUrl="/"
              />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Link href="/sign-in" style={{ display: 'none' }} className="sm:block">
                  <button className="btn btn-secondary btn-sm">
                    Sign In
                  </button>
                </Link>
                <Link href="/quiz">
                  <button className="btn btn-primary btn-sm">
                    Start Free Quiz
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                color: '#4b5563',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
              className="lg:block"
              onMouseOver={(e) => {
                e.target.style.color = '#111827';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#4b5563';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>Open menu</span>
              <div style={{
                width: '1.5rem',
                height: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <span style={{
                  backgroundColor: 'currentColor',
                  display: 'block',
                  height: '2px',
                  width: '1.5rem',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease-in-out',
                  transform: mobileMenuOpen ? 'rotate(45deg) translateY(4px)' : 'translateY(-2px)'
                }}></span>
                <span style={{
                  backgroundColor: 'currentColor',
                  display: 'block',
                  height: '2px',
                  width: '1.5rem',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease-in-out',
                  opacity: mobileMenuOpen ? 0 : 1
                }}></span>
                <span style={{
                  backgroundColor: 'currentColor',
                  display: 'block',
                  height: '2px',
                  width: '1.5rem',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease-in-out',
                  transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-4px)' : 'translateY(2px)'
                }}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '0.5rem',
            paddingBottom: '0.75rem'
          }} className="lg:hidden">
            <div style={{
              padding: '0 0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#4b5563',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = '#2563eb';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = '#4b5563';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.name}
                </Link>
              ))}
              {!isSignedIn && (
                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid #e5e7eb',
                  marginTop: '0.5rem'
                }}>
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem' }}>
                      Sign In
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}