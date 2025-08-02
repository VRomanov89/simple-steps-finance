import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables
    const hasResendKey = !!process.env.RESEND_API_KEY;
    const resendKeyLength = process.env.RESEND_API_KEY?.length || 0;
    
    return NextResponse.json({
      success: true,
      debug: {
        hasResendKey,
        resendKeyLength: hasResendKey ? `${resendKeyLength} characters` : 'Not found',
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
        timestamp: new Date().toISOString(),
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      }
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Debug information
    const debugInfo = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyLength: process.env.RESEND_API_KEY?.length || 0,
      emailProvided: !!email,
      emailValue: email,
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    };

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY not found in environment variables',
        debug: debugInfo
      }, { status: 500 });
    }

    if (!email) {
      return NextResponse.json({
        success: false,
        error: 'Email is required',
        debug: debugInfo
      }, { status: 400 });
    }

    // Try to import and use Resend
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const { data, error } = await resend.emails.send({
        from: 'Debug Test <onboarding@resend.dev>',
        to: email,
        subject: 'Debug Test - Simple Steps Finance',
        html: `
          <h1>Debug Email Test</h1>
          <p>This debug email was sent successfully!</p>
          <pre>${JSON.stringify(debugInfo, null, 2)}</pre>
          <p>Sent at: ${new Date().toISOString()}</p>
        `,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          error: 'Resend API error',
          resendError: error,
          debug: debugInfo
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Debug email sent successfully',
        data,
        debug: debugInfo
      });

    } catch (importError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to import Resend',
        importError: importError instanceof Error ? importError.message : 'Unknown import error',
        debug: debugInfo
      }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'API error',
      details: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        timestamp: new Date().toISOString(),
      }
    }, { status: 500 });
  }
}