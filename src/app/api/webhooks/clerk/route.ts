import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { upsertUserFromAuth } from '@/lib/database';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set');
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as any;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  
  try {
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name } = evt.data;
      
      const primaryEmail = email_addresses.find((email: any) => email.id === evt.data.primary_email_address_id);
      const fullName = first_name && last_name ? `${first_name} ${last_name}` : first_name || last_name || undefined;

      await upsertUserFromAuth({
        id,
        email: primaryEmail?.email_address,
        full_name: fullName,
        auth_provider: 'clerk',
      });

      console.log(`User ${eventType}: ${id}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response('Error processing webhook', {
      status: 500,
    });
  }
}