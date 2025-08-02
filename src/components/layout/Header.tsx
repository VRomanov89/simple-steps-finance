'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    ...(isSignedIn ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname === href;
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
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
          height: '4.5rem'
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
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
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
              }}>Simple Steps Finance</span>
              <span style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                marginTop: '-0.125rem'
              }}>Master Your Money</span>
            </div>
          </Link>

          {/* Right side - Navigation + Auth */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {/* Desktop Navigation */}
            <nav style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.5rem'
            }} className="md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    color: isActive(item.href) ? '#2563eb' : '#4b5563',
                    fontWeight: isActive(item.href) ? '600' : '500',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    background: isActive(item.href) ? 'rgba(37, 99, 235, 0.1)' : 'transparent'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive(item.href)) {
                      e.target.style.color = '#2563eb';
                      e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive(item.href)) {
                      e.target.style.color = '#4b5563';
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#2563eb',
                      borderRadius: '50%'
                    }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
            {isSignedIn ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all",
                    userButtonPopoverCard: "shadow-xl border-0 rounded-xl",
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
                <Link href="/sign-in">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    Sign In
                  </button>
                </Link>
                <Link href="/quiz">
                  <button 
                    className="btn btn-primary btn-sm"
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 8px 16px -4px rgba(37, 99, 235, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    Start Free Quiz
                  </button>
                </Link>
              </div>
            )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'block',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                color: '#4b5563',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
              className="md:hidden"
              onMouseOver={(e) => {
                e.target.style.color = '#111827';
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#4b5563';
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'scale(1)';
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
            paddingTop: '1rem',
            paddingBottom: '1rem',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0 0 1rem 1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }} className="md:hidden">
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
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: isActive(item.href) ? '600' : '500',
                    color: isActive(item.href) ? '#2563eb' : '#4b5563',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s ease-in-out',
                    background: isActive(item.href) ? 'rgba(37, 99, 235, 0.1)' : 'transparent'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive(item.href)) {
                      e.target.style.color = '#2563eb';
                      e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
                      e.target.style.transform = 'translateX(4px)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive(item.href)) {
                      e.target.style.color = '#4b5563';
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
              {!isSignedIn && (
                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid #e5e7eb',
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <button className="btn btn-secondary" style={{ width: '100%' }}>
                      Sign In
                    </button>
                  </Link>
                  <Link href="/quiz" onClick={() => setMobileMenuOpen(false)}>
                    <button className="btn btn-primary" style={{ width: '100%' }}>
                      Start Free Quiz
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