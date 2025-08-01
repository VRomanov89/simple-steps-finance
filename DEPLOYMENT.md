# SimpleStepsFinance - Deployment Guide

This guide will walk you through setting up all the required services and deploying your SimpleStepsFinance application.

## 🔧 Prerequisites

Before you begin, make sure you have accounts with these services:
- [Vercel](https://vercel.com) (for hosting)
- [Clerk](https://clerk.dev) (for authentication)
- [Supabase](https://supabase.com) (for database)
- [Stripe](https://stripe.com) (for payments)
- [Resend](https://resend.com) (for emails)

## 📋 Step-by-Step Setup

### 1. Supabase Database Setup

1. **Create a new Supabase project:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Click "New Project"
   - Choose your organization
   - Enter project name: `simple-steps-finance`
   - Create a strong database password
   - Select a region close to your users

2. **Set up the database:**
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
   - Click "Run" to execute the migration
   - Verify tables were created in the Table Editor

3. **Get your Supabase credentials:**
   - Go to Settings → API
   - Copy the `URL` and `anon/public` key
   - Copy the `service_role` key (keep this secret!)

### 2. Clerk Authentication Setup

1. **Create a Clerk application:**
   - Go to [Clerk Dashboard](https://dashboard.clerk.dev)
   - Click "Add application"
   - Name: `SimpleStepsFinance`
   - Select authentication methods: Email, Google, Facebook

2. **Configure social providers (optional but recommended):**
   - Go to User & Authentication → Social Connections
   - Enable Google and Facebook
   - Follow the setup guides for each provider

3. **Set up webhooks:**
   - Go to Webhooks in Clerk dashboard
   - Click "Add Endpoint"
   - Endpoint URL: `https://your-domain.vercel.app/api/webhooks/clerk`
   - Subscribe to events: `user.created`, `user.updated`
   - Copy the webhook secret

4. **Get your Clerk keys:**
   - Go to Developers → API Keys
   - Copy `Publishable key` and `Secret key`

### 3. Stripe Payment Setup

1. **Create a Stripe account:**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Complete account setup

2. **Create products and prices:**
   - Go to Products in Stripe dashboard
   - Create product: "SimpleStepsFinance Pro"
   - Add two prices:
     - Monthly: $9.00 USD, recurring monthly
     - Yearly: $90.00 USD, recurring yearly
   - Copy the price IDs (they start with `price_`)

3. **Get your Stripe keys:**
   - Go to Developers → API keys
   - Copy `Publishable key` and `Secret key`
   - Note: Use test keys for development, live keys for production

4. **Set up webhooks (after deployment):**
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.updated`

### 4. Resend Email Setup

1. **Create a Resend account:**
   - Go to [Resend](https://resend.com)
   - Sign up and verify your account

2. **Get your API key:**
   - Go to API Keys
   - Create a new API key
   - Copy the key (starts with `re_`)

### 5. Environment Variables Setup

Create a `.env.local` file in your project root:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_monthly_id_here
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_yearly_id_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Resend
RESEND_API_KEY=re_your_api_key_here

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Local Development Testing

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Test key features:**
   - Homepage loads correctly
   - Quiz functionality works
   - User can sign up/sign in
   - Pricing page displays correctly
   - Database queries work (check browser console for errors)

### 7. Vercel Deployment

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial SimpleStepsFinance deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings (Vercel should auto-detect Next.js)
   - Add environment variables:
     - Copy all variables from your `.env.local`
     - Update `NEXT_PUBLIC_APP_URL` to your Vercel domain
   - Click "Deploy"

3. **Update webhook URLs:**
   - Once deployed, update webhook URLs in Clerk and Stripe
   - Replace `your-domain.vercel.app` with your actual Vercel domain

### 8. Post-Deployment Configuration

1. **Update Clerk allowed origins:**
   - Go to Clerk Dashboard → Developers → Allowed origins
   - Add your Vercel domain

2. **Update Stripe webhook endpoint:**
   - Update the webhook URL with your live domain
   - Test webhook delivery

3. **Test the full user flow:**
   - Take the quiz
   - Sign up for an account
   - Complete a payment (use Stripe test cards)
   - Verify dashboard access

## 🔒 Security Checklist

- [ ] All environment variables are properly set
- [ ] Database RLS policies are enabled
- [ ] Webhook endpoints are secured
- [ ] API keys are not exposed in client-side code
- [ ] HTTPS is enabled (automatic with Vercel)

## 🚀 Go Live Checklist

- [ ] Switch Stripe from test to live mode
- [ ] Update all environment variables with production keys
- [ ] Test payment flow with real cards
- [ ] Set up monitoring and error tracking
- [ ] Configure custom domain (optional)

## 🛠️ Troubleshooting

### Common Issues:

1. **Database connection errors:**
   - Check Supabase URL and keys
   - Verify RLS policies are set up correctly

2. **Authentication not working:**
   - Verify Clerk keys and allowed origins
   - Check webhook configuration

3. **Payment errors:**
   - Ensure Stripe keys match the environment (test/live)
   - Verify webhook endpoint is accessible

4. **Build failures:**
   - Check for TypeScript errors
   - Ensure all dependencies are installed

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review Vercel deployment logs
3. Check service dashboards for API status
4. Verify all environment variables are set correctly

## 🎉 You're Live!

Once everything is set up, your SimpleStepsFinance application will be live and ready to help users take control of their finances!