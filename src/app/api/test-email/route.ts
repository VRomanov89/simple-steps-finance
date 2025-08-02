import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured - RESEND_API_KEY missing' },
        { status: 500 }
      );
    }

    // Send test email
    const fromEmail = process.env.NODE_ENV === 'production' 
      ? 'Simple Steps Finance <hello@resend.dev>' // Change to your domain when ready
      : 'Simple Steps Finance <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Test Email - Simple Steps Finance',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from Simple Steps Finance.</p>
        <p>If you receive this, the email functionality is working correctly.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      data 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}