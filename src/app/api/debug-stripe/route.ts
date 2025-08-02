import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET() {
  try {
    // Test basic Stripe connection
    const account = await stripe.accounts.retrieve();
    
    return NextResponse.json({
      success: true,
      message: 'Stripe connection successful',
      account: {
        id: account.id,
        business_profile: account.business_profile,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
      },
      env_vars: {
        monthly_price_id: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || 'NOT_SET',
        yearly_price_id: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || 'NOT_SET',
        secret_key_present: !!process.env.STRIPE_SECRET_KEY,
        publishable_key_present: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      }
    });
  } catch (error) {
    console.error('Stripe connection test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      env_vars: {
        monthly_price_id: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || 'NOT_SET',
        yearly_price_id: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || 'NOT_SET',
        secret_key_present: !!process.env.STRIPE_SECRET_KEY,
        publishable_key_present: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      }
    }, { status: 500 });
  }
}