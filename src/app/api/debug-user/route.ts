import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/database';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Get current user from Clerk
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'No authenticated user found',
        clerk_status: 'not_authenticated'
      });
    }

    // Check Supabase connection
    let supabaseStatus = 'unknown';
    let supabaseError = null;
    try {
      const { data, error } = await supabase.from('users').select('count').limit(1);
      if (error) {
        supabaseStatus = 'error';
        supabaseError = error.message;
      } else {
        supabaseStatus = 'connected';
      }
    } catch (err) {
      supabaseStatus = 'connection_failed';
      supabaseError = err instanceof Error ? err.message : 'Unknown error';
    }

    // Try to get user from database
    let dbUser = null;
    let dbError = null;
    try {
      dbUser = await getUserById(user.id);
    } catch (err) {
      dbError = err instanceof Error ? err.message : 'Unknown error';
    }

    // Check localStorage data (this will be null in server context)
    const hasLocalStorage = typeof window !== 'undefined';

    return NextResponse.json({
      success: true,
      debug_info: {
        clerk_user: {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
        },
        supabase: {
          status: supabaseStatus,
          error: supabaseError,
          env_vars: {
            hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          }
        },
        database_user: {
          exists: !!dbUser,
          user: dbUser,
          error: dbError
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV,
          hasLocalStorage
        }
      }
    });

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}