import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.error('No user ID found in auth');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId, planType } = await req.json();
    console.log('Checkout request:', { userId, priceId, planType });

    if (!priceId || !planType) {
      console.error('Missing required fields:', { priceId, planType });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate priceId format
    if (!priceId.startsWith('price_') && priceId !== 'price_placeholder') {
      console.error('Invalid price ID format:', priceId);
      return NextResponse.json({ error: 'Invalid price ID format' }, { status: 400 });
    }

    // Create or retrieve customer
    let customer;
    try {
      // First, try to find existing customer by Clerk user ID metadata
      const existingCustomers = await stripe.customers.list({
        limit: 100, // Increase limit to find the right customer
      });

      // Look for customer with matching clerk_user_id in metadata
      const existingCustomer = existingCustomers.data.find(
        c => c.metadata.clerk_user_id === userId
      );

      if (existingCustomer) {
        customer = existingCustomer;
      } else {
        // Create new customer with Clerk user ID in metadata
        customer = await stripe.customers.create({
          metadata: {
            clerk_user_id: userId,
          },
        });
      }
    } catch (error) {
      console.error('Error creating/finding customer:', error);
      return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }

    console.log('Creating checkout session with customer:', customer.id);

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      allow_promotion_codes: true,
      metadata: {
        clerk_user_id: userId,
        plan_type: planType,
      },
    });

    console.log('Checkout session created successfully:', session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Provide more specific error details
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = {
      message: errorMessage,
      type: error instanceof Error ? error.constructor.name : 'UnknownError',
      stack: error instanceof Error ? error.stack : undefined
    };
    
    console.error('Detailed error info:', errorDetails);
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}