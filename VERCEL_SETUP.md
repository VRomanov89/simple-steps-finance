# Vercel Environment Variables Setup

## 🚨 Current Issue
The application is failing because Supabase environment variables are not set in Vercel production environment.

## 🔧 Quick Fix - Set Environment Variables in Vercel

### 1. Go to Vercel Dashboard
1. Open your Vercel dashboard
2. Go to your `simple-steps-finance` project
3. Click on **Settings** tab
4. Click on **Environment Variables**

### 2. Add Required Environment Variables

Add these **EXACT** variable names and values from your `.env.local` file:

#### Supabase Variables (REQUIRED)
**Copy these values from your `.env.local` file:**
```
NEXT_PUBLIC_SUPABASE_URL=[Your Supabase project URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Your Supabase anon key]
SUPABASE_SERVICE_ROLE_KEY=[Your Supabase service role key]
```

#### Clerk Variables (REQUIRED)
**Copy these values from your `.env.local` file:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[Your Clerk publishable key]
CLERK_SECRET_KEY=[Your Clerk secret key]
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

#### Stripe Variables (REQUIRED)
**Copy these values from your `.env.local` file:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[Your Stripe publishable key]
STRIPE_SECRET_KEY=[Your Stripe secret key]
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=[Your monthly price ID]
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=[Your yearly price ID]
```

#### Resend Variables (REQUIRED)
**Copy these values from your `.env.local` file:**
```
RESEND_API_KEY=[Your Resend API key]
```

#### App URL (REQUIRED)
**Set to your Vercel app URL:**
```
NEXT_PUBLIC_APP_URL=[Your Vercel app URL]
```

### 3. Set Environment for All Environments
Make sure to select:
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

### 4. Redeploy
After adding all environment variables:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** (or push a new commit)

## 🔍 Verification

After redeploying, the application should:
1. ✅ Load without "supabaseKey is required" error
2. ✅ Show proper error messages if other issues exist
3. ✅ Allow user login and signup
4. ✅ Connect to database properly

## 🚨 Emergency Fallback Mode

If you need the app to work without database temporarily, you can:

1. **Use localStorage only mode**
   - Quiz results stored in browser only
   - No user persistence
   - No subscription tracking

2. **Disable database features**
   - Comment out database imports
   - Use hardcoded data
   - Skip user creation

## 📊 Expected Logs

After setting environment variables, you should see in Vercel logs:
```
Supabase Environment Check: {
  hasUrl: true,
  hasAnonKey: true, 
  hasServiceKey: true,
  url: 'https://jtmsbkhshhei...'
}
```

## 🔧 Troubleshooting

### If still getting errors:
1. **Check spelling** - Environment variable names are case-sensitive
2. **No extra spaces** - Copy values exactly
3. **Redeploy** - Environment changes require redeployment
4. **Check logs** - Vercel Functions tab shows runtime errors

### Common mistakes:
- Missing `NEXT_PUBLIC_` prefix for client-side variables
- Copying environment variable names incorrectly
- Not redeploying after setting variables
- Setting variables for wrong environment (dev vs prod)

## 📞 Support

If you continue having issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Ensure Supabase project is active
4. Test locally first with same environment variables