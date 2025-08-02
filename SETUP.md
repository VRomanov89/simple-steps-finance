# Simple Steps Finance - Complete Setup Guide

This guide will help you set up the complete user management and subscription system for Simple Steps Finance.

## 🗄️ Database Setup (Supabase)

### 1. Create Database Tables

Go to your Supabase dashboard → SQL Editor and run the contents of `database/schema.sql`. This will create:

- **users** table - stores user profiles and subscription status
- **stages** table - financial stages with scoring ranges
- **quiz_results** table - individual quiz answers and scores

### 2. Verify Database Setup

Test the database setup by calling:
```bash
curl -X POST http://localhost:3000/api/database/init
```

## 🔐 Authentication Setup (Clerk)

### 1. Configure Clerk Webhook

In your Clerk Dashboard:
1. Go to Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`
4. Add the webhook secret to your `.env.local`:
   ```
   CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### 2. User Creation Flow

When users sign up with Clerk, the webhook automatically creates them in Supabase with:
- Clerk ID as primary key
- Email and name from Clerk
- Default `subscription_status: 'free'`

## 💳 Payment Setup (Stripe)

### 1. Configure Stripe Webhook

In your Stripe Dashboard:
1. Go to Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Add the webhook secret to your `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
   ```

### 2. Subscription Management

The system handles subscription status automatically:
- **Payment succeeded** → `subscription_status: 'active'`
- **Subscription canceled** → `subscription_status: 'canceled'`
- **No subscription** → `subscription_status: 'free'`

## 📊 Data Flow

### Quiz Completion
1. User takes quiz (logged in or anonymous)
2. If logged in → saves to database immediately
3. If anonymous → saves to localStorage, migrates on next dashboard visit
4. Email with results sent via Resend API

### Dashboard Access
1. User visits dashboard
2. System migrates any localStorage data to database
3. Loads user data from database (stage, progress, subscription)
4. Shows personalized content based on subscription status

### Subscription Flow
1. User clicks "Start Your Journey" on pricing page
2. Creates Stripe customer (linked to Clerk user ID)
3. Redirects to Stripe Checkout
4. Webhook updates subscription status in database
5. Dashboard immediately reflects new access level

## 🚀 Features Implemented

### ✅ User Management
- Automatic user creation via Clerk webhook
- Database storage of user profiles and quiz data
- Migration from localStorage to database

### ✅ Subscription Tracking
- Real-time subscription status updates via Stripe webhooks
- Database-driven access control
- Seamless upgrade/downgrade handling

### ✅ Quiz System
- Personalized financial stages based on quiz scores
- Individual answer tracking for analytics
- Email delivery of results

### ✅ Dashboard
- Stage-specific action steps
- Progress tracking with database persistence
- Subscription-based content gating

## 🔧 Environment Variables

Ensure all these are set in your `.env.local`:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🧪 Testing

### 1. Test User Creation
1. Sign up with a new account
2. Check Supabase users table for new entry
3. Verify webhook logs in Clerk dashboard

### 2. Test Quiz Flow
1. Take the quiz while logged in
2. Check database for quiz_results entries
3. Verify email delivery

### 3. Test Subscription
1. Complete payment flow on pricing page
2. Check Stripe dashboard for successful payment
3. Verify subscription_status updated in database
4. Confirm dashboard shows premium content

### 4. Test Webhooks
- **Clerk webhook**: Check user creation/updates
- **Stripe webhook**: Check subscription status changes
- Monitor webhook logs in both dashboards

## 📋 Database Schema

### Users Table
- `id` (TEXT) - Clerk user ID
- `email` (TEXT) - User email
- `subscription_status` - 'free', 'active', 'canceled'
- `stage_id` (INTEGER) - Current financial stage
- `quiz_score` (INTEGER) - Latest quiz score
- `roadmap_progress` (JSONB) - Step completion data

### Stages Table
- Pre-populated with 8 financial stages
- Score ranges for automatic stage assignment

### Quiz Results Table
- Individual quiz answers for analytics
- Linked to users for historical tracking

## 🚨 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Verify Supabase URL and keys
   - Check RLS policies are properly set

2. **Webhook not firing**
   - Verify webhook URLs are accessible
   - Check webhook secrets match environment variables

3. **Subscription status not updating**
   - Verify Stripe webhook is receiving events
   - Check webhook handler logs for errors

4. **User not found in database**
   - Ensure Clerk webhook fired on user creation
   - Check webhook logs for any errors

### Debug Endpoints

- `GET /api/debug-stripe` - Test Stripe connection
- `POST /api/database/init` - Verify database setup
- `GET /debug-env` - Check environment variables

## 🎯 Next Steps

The system is now fully integrated with:
- ✅ User authentication and storage
- ✅ Subscription management and access control  
- ✅ Quiz system with database persistence
- ✅ Email notifications
- ✅ Real-time webhook processing

Your users can now:
1. Sign up and be automatically stored in the database
2. Take quizzes with results saved to their profile
3. Subscribe and get immediate access to premium features
4. Track their progress with database persistence
5. Retake quizzes and update their financial stage

All data flows seamlessly between Clerk (auth) → Supabase (storage) → Stripe (payments) with webhooks keeping everything in sync.