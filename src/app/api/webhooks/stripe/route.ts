import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { updateUser, updateUserByStripeCustomer } from '@/lib/database';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.log('⚠️ Stripe webhook secret not set');
    return new Response('Webhook secret not configured', { status: 400 });
  }

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return new Response('No signature provided', { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log('✅ Stripe webhook received:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('💳 Checkout session completed:', session.id);

        // Get customer and subscription details
        if (session.subscription && session.customer) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          const clerkUserId = session.metadata?.clerk_user_id;

          if (clerkUserId) {
            await updateUser(clerkUserId, {
              stripe_customer_id: session.customer as string,
              subscription_status: 'active',
            });
            console.log('✅ User updated with subscription:', clerkUserId);
          }
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        console.log('💰 Payment succeeded for invoice:', invoice.id);

        if (invoice.customer && invoice.subscription) {
          await updateUserByStripeCustomer(invoice.customer as string, {
            subscription_status: 'active',
          });
          console.log('✅ User subscription marked as active');
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        console.log('📋 Subscription updated:', subscription.id);

        // Update user subscription status based on subscription status
        const status = subscription.status === 'active' ? 'active' : 
                      subscription.status === 'canceled' ? 'canceled' : 'free';
        
        await updateUserByStripeCustomer(subscription.customer as string, {
          subscription_status: status as 'free' | 'active' | 'canceled',
        });
        console.log('✅ User subscription status updated to:', status);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log('❌ Subscription canceled:', subscription.id);

        await updateUserByStripeCustomer(subscription.customer as string, {
          subscription_status: 'canceled',
        });
        console.log('✅ User subscription marked as canceled');
        break;
      }

      default:
        console.log(`🤷‍♂️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}