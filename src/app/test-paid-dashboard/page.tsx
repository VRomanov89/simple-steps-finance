'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TestPaidDashboard() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Update user metadata to simulate paid subscription
      user.update({
        publicMetadata: {
          ...user.publicMetadata,
          subscriptionStatus: 'active',
          plan: 'premium',
          isPaid: true
        }
      }).then(() => {
        // Redirect to dashboard after updating metadata
        router.push('/dashboard');
      }).catch((error) => {
        console.error('Failed to update user metadata:', error);
      });
    }
  }, [user, router]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="card card-elevated" style={{
        maxWidth: '32rem',
        width: '100%',
        padding: '2.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '4rem',
          height: '4rem',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
          <span style={{ fontSize: '1.5rem' }}>✅</span>
        </div>
        
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '1rem'
        }}>
          Activating Premium Access
        </h1>
        
        <p style={{
          color: '#4b5563',
          marginBottom: '2rem'
        }}>
          Setting up your premium dashboard experience...
        </p>
        
        <div style={{
          width: '3rem',
          height: '3rem',
          border: '4px solid #10b981',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
          margin: '0 auto',
          animation: 'spin 1s linear infinite'
        }}></div>
        
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}