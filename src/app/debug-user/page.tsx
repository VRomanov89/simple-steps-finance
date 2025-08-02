'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface DebugInfo {
  success: boolean;
  debug_info?: any;
  error?: string;
}

export default function DebugUserPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [localStorageData, setLocalStorageData] = useState<any>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const fetchDebugInfo = async () => {
      try {
        const response = await fetch('/api/debug-user');
        const data = await response.json();
        setDebugInfo(data);

        // Check localStorage for quiz results
        const quizResults = localStorage.getItem('quizResults');
        const dashboardProgress = localStorage.getItem('dashboardProgress');
        
        setLocalStorageData({
          quizResults: quizResults ? JSON.parse(quizResults) : null,
          dashboardProgress: dashboardProgress ? JSON.parse(dashboardProgress) : null,
          hasQuizResults: !!quizResults,
          hasDashboardProgress: !!dashboardProgress
        });

      } catch (error) {
        setDebugInfo({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      fetchDebugInfo();
    }
  }, [isLoaded]);

  if (loading || !isLoaded) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
        <h1>🔍 User Debug Information</h1>
        <p>Loading debug information...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🔍 User Debug Information</h1>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        border: '1px solid #ddd' 
      }}>
        <h2>Quick Status</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>Clerk User:</strong> {user ? '✅ Authenticated' : '❌ Not authenticated'}
          </div>
          <div>
            <strong>Database User:</strong> {debugInfo?.debug_info?.database_user?.exists ? '✅ Exists' : '❌ Missing'}
          </div>
          <div>
            <strong>Supabase:</strong> {debugInfo?.debug_info?.supabase?.status === 'connected' ? '✅ Connected' : '❌ Error'}
          </div>
          <div>
            <strong>Local Quiz Data:</strong> {localStorageData?.hasQuizResults ? '✅ Present' : '❌ Missing'}
          </div>
        </div>
      </div>

      {debugInfo?.error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          border: '1px solid #ffcdd2'
        }}>
          <h3>Error</h3>
          <pre>{debugInfo.error}</pre>
        </div>
      )}

      {debugInfo?.debug_info && (
        <>
          <div style={{ 
            backgroundColor: '#e3f2fd', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: '1px solid #bbdefb'
          }}>
            <h3>Clerk User Information</h3>
            <pre>{JSON.stringify(debugInfo.debug_info.clerk_user, null, 2)}</pre>
          </div>

          <div style={{ 
            backgroundColor: debugInfo.debug_info.supabase.status === 'connected' ? '#e8f5e8' : '#ffebee',
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: `1px solid ${debugInfo.debug_info.supabase.status === 'connected' ? '#c8e6c9' : '#ffcdd2'}`
          }}>
            <h3>Supabase Connection</h3>
            <pre>{JSON.stringify(debugInfo.debug_info.supabase, null, 2)}</pre>
          </div>

          <div style={{ 
            backgroundColor: debugInfo.debug_info.database_user.exists ? '#e8f5e8' : '#fff3e0',
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: `1px solid ${debugInfo.debug_info.database_user.exists ? '#c8e6c9' : '#ffcc02'}`
          }}>
            <h3>Database User</h3>
            <pre>{JSON.stringify(debugInfo.debug_info.database_user, null, 2)}</pre>
          </div>

          <div style={{ 
            backgroundColor: '#f3e5f5', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            border: '1px solid #e1bee7'
          }}>
            <h3>Environment</h3>
            <pre>{JSON.stringify(debugInfo.debug_info.environment, null, 2)}</pre>
          </div>
        </>
      )}

      {localStorageData && (
        <div style={{ 
          backgroundColor: '#fff8e1', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          border: '1px solid #ffecb3'
        }}>
          <h3>Local Storage Data</h3>
          <pre>{JSON.stringify(localStorageData, null, 2)}</pre>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '8px', 
        marginTop: '2rem',
        border: '1px solid #ddd'
      }}>
        <h3>🔧 Troubleshooting Actions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#dc2626', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={async () => {
              try {
                const response = await fetch('/api/migrate-user', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    localStorageData: localStorageData
                  })
                });
                const result = await response.json();
                if (result.success) {
                  alert('✅ User migration successful! Try going to dashboard now.');
                  window.location.reload();
                } else {
                  alert('❌ Migration failed: ' + result.error);
                }
              } catch (error) {
                alert('❌ Migration error: ' + (error instanceof Error ? error.message : 'Unknown error'));
              }
            }}
          >
            🚑 Force User Migration
          </button>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => {
              localStorage.clear();
              alert('Local storage cleared. Try taking the quiz again.');
            }}
          >
            Clear Local Storage
          </button>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#10b981', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
          <a 
            href="/quiz" 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#f59e0b', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '4px',
              textAlign: 'center'
            }}
          >
            Go to Quiz
          </a>
          <a 
            href="/dashboard" 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#8b5cf6', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '4px',
              textAlign: 'center'
            }}
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}