import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { STAGE_NEXT_STEPS } from '@/constants/stage-next-steps';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, stage, totalScore } = body;

    if (!email || !stage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get personalized next steps for this stage
    const nextSteps = STAGE_NEXT_STEPS[stage.id] || STAGE_NEXT_STEPS[1];

    // Create personalized email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your Financial Assessment Results</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; }
          .content { padding: 30px 0; }
          .stage-box { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .step { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #2563eb; }
          .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 14px; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Your Financial Assessment Results</h1>
          <p>Welcome to Simple Steps Finance!</p>
        </div>
        
        <div class="content">
          <p>Hi there,</p>
          
          <p>Thank you for taking our financial assessment! Based on your responses, you're at:</p>
          
          <div class="stage-box">
            <h2>Stage ${stage.id}: ${stage.label}</h2>
            <p><strong>Score:</strong> ${totalScore}/24</p>
            <p>${stage.description}</p>
          </div>
          
          <h3>Your Next Steps:</h3>
          ${nextSteps.slice(0, 3).map((step: any, index: number) => `
            <div class="step">
              <h4>${index + 1}. ${step.title}</h4>
              <p>${step.description}</p>
              <p><strong>Timeframe:</strong> ${step.timeframe}</p>
            </div>
          `).join('')}
          
          <center>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://simplestepsfinance.com'}/sign-up" class="cta-button">
              Create Your Free Account
            </a>
          </center>
          
          <p>With your free account, you'll get:</p>
          <ul>
            <li>Your complete personalized roadmap</li>
            <li>Progress tracking tools</li>
            <li>Mini-assessments for each step</li>
            <li>Helpful resources and calculators</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Simple Steps Finance. All rights reserved.</p>
          <p>You're receiving this email because you completed our financial assessment.</p>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend
    // For production, use your verified domain. For testing, use resend.dev
    const fromEmail = process.env.NODE_ENV === 'production' 
      ? 'Simple Steps Finance <hello@resend.dev>' // Change to your domain when ready
      : 'Simple Steps Finance <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Your Financial Assessment Results - Stage ${stage.id}: ${stage.label}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}