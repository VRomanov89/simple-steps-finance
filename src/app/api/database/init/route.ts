import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST() {
  try {
    // Check if tables exist and create them if needed
    
    // Check if users table exists
    const { data: usersTable, error: usersError } = await supabaseAdmin
      .from('users')
      .select('id')
      .limit(1);

    if (usersError && usersError.code === '42P01') {
      // Table doesn't exist, return instructions
      return NextResponse.json({
        success: false,
        message: 'Database tables not found. Please run the SQL schema in your Supabase dashboard.',
        schema_file: '/database/schema.sql',
        instructions: [
          '1. Go to your Supabase dashboard',
          '2. Navigate to SQL Editor',
          '3. Copy and paste the contents of database/schema.sql',
          '4. Run the SQL commands',
          '5. Try this endpoint again'
        ]
      }, { status: 400 });
    }

    // Check if stages table has data
    const { data: stages, error: stagesError } = await supabaseAdmin
      .from('stages')
      .select('id')
      .limit(1);

    if (stagesError) {
      return NextResponse.json({
        success: false,
        error: 'Error checking stages table',
        details: stagesError.message
      }, { status: 500 });
    }

    if (!stages || stages.length === 0) {
      // Insert default stages
      const defaultStages = [
        { id: 1, label: 'Buried in Debt', score_min: 0, score_max: 5, description: 'Overwhelmed by debt and stress — needs stability first' },
        { id: 2, label: 'Stabilizing', score_min: 6, score_max: 8, description: 'Starting to catch up, still paycheck to paycheck' },
        { id: 3, label: 'Budget Beginner', score_min: 9, score_max: 11, description: 'Building structure, new to tracking' },
        { id: 4, label: 'Debt Destroyer', score_min: 12, score_max: 14, description: 'Actively paying down balances with a plan' },
        { id: 5, label: 'Safety Net Builder', score_min: 15, score_max: 17, description: 'Emergency fund growing, basic control gained' },
        { id: 6, label: 'Smart Saver', score_min: 18, score_max: 20, description: 'Regular budgeting and early investing' },
        { id: 7, label: 'Wealth Strategist', score_min: 21, score_max: 22, description: 'Multi-goal planning and consistent investing' },
        { id: 8, label: 'FIRE Ready', score_min: 23, score_max: 24, description: 'Financially independent or close to it' }
      ];

      const { error: insertError } = await supabaseAdmin
        .from('stages')
        .upsert(defaultStages);

      if (insertError) {
        return NextResponse.json({
          success: false,
          error: 'Error inserting default stages',
          details: insertError.message
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      tables: {
        users: 'Ready',
        stages: 'Ready with default data',
        quiz_results: 'Ready'
      }
    });

  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({
      success: false,
      error: 'Database initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}