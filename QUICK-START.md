# 🚀 Quick Start Guide

## 1. Set Up Services (15 minutes)

### Supabase (Database)
1. Go to [supabase.com](https://supabase.com) → Create project
2. Copy the SQL from `supabase/migrations/001_initial_schema.sql`
3. Paste in SQL Editor → Run
4. Get URL + anon key + service_role key from Settings → API

### Clerk (Authentication)  
1. Go to [clerk.dev](https://clerk.dev) → Add application
2. Enable Email + Google + Facebook authentication
3. Get publishable key + secret key from API Keys
4. Set up webhook (optional for now)

### Stripe (Payments)
1. Go to [stripe.com](https://stripe.com) → Create account
2. Create Products:
   - "SimpleStepsFinance Pro" 
   - Price 1: $9/month (recurring)
   - Price 2: $90/year (recurring)
3. Get publishable key + secret key + price IDs from Developers → API Keys

### Resend (Email)
1. Go to [resend.com](https://resend.com) → Create account
2. Get API key from dashboard

## 2. Configure Environment (2 minutes)

Run the interactive setup:
```bash
npm run setup
```

This will create your `.env.local` file with all required variables.

## 3. Test Locally (5 minutes)

```bash
npm install
npm run dev
```

Visit http://localhost:3000 and test:
- ✅ Homepage loads
- ✅ Quiz works  
- ✅ Sign up works
- ✅ Pricing page works

## 4. Deploy to Vercel (5 minutes)

### Option A: GitHub + Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Add all environment variables from your `.env.local`
5. Update `NEXT_PUBLIC_APP_URL` to your Vercel domain
6. Deploy!

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel
# Follow prompts, add environment variables
```

## 5. Post-Deployment (5 minutes)

1. **Update webhook URLs:**
   - Clerk: `https://your-domain.vercel.app/api/webhooks/clerk`
   - Stripe: `https://your-domain.vercel.app/api/webhooks/stripe`

2. **Test production:**
   - Take quiz → Sign up → Make test payment
   - Use Stripe test cards: `4242 4242 4242 4242`

## 🎉 You're Live!

Your SimpleStepsFinance app is now live and ready to help users take control of their finances!

## 🆘 Need Help?

Check `DEPLOYMENT.md` for detailed troubleshooting or common issues.

## 🔧 Quick Commands

```bash
npm run setup      # Set up environment variables
npm run dev        # Start development server  
npm run build      # Build for production
npm run type-check # Check TypeScript
npm run deploy     # Build and deploy to Vercel
```