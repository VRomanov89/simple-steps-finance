import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { ensureUserExists, migrateLocalStorageToDatabase } from '@/lib/user-service';

export async function POST(request: NextRequest) {
  try {
    // Get current user from Clerk
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'No authenticated user found'
      }, { status: 401 });
    }

    console.log('🔄 Manual user migration started for:', user.id);

    // Ensure user exists in database
    const dbUser = await ensureUserExists({
      id: user.id,
      primaryEmailAddress: user.primaryEmailAddress,
      firstName: user.firstName,
      lastName: user.lastName
    });

    console.log('✅ User created/updated in database:', dbUser.id);

    // Get the request body to see if there's localStorage data to migrate
    const body = await request.json().catch(() => ({}));
    
    if (body.localStorageData) {
      console.log('📦 Migrating localStorage data...');
      
      // Save quiz results if provided
      if (body.localStorageData.quizResults) {
        const { saveUserQuizResults } = await import('@/lib/user-service');
        await saveUserQuizResults(user.id, body.localStorageData.quizResults);
        console.log('✅ Quiz results migrated');
      }

      // Save dashboard progress if provided
      if (body.localStorageData.dashboardProgress) {
        const { updateUserProgress } = await import('@/lib/user-service');
        await updateUserProgress(user.id, body.localStorageData.dashboardProgress);
        console.log('✅ Dashboard progress migrated');
      }
    }

    return NextResponse.json({
      success: true,
      message: 'User migration completed successfully',
      user: {
        id: dbUser.id,
        email: dbUser.email,
        created: true
      }
    });

  } catch (error) {
    console.error('❌ User migration failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}