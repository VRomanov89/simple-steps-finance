# Production Email Setup Guide

## Current Status
- ✅ Email system is built and ready
- ⚠️ Currently using Resend test domain (`onboarding@resend.dev`)
- 🎯 Need to configure production domain for real user emails

## Quick Setup for Production Emails

### Option 1: Use Your Own Domain (Recommended)

1. **Add your domain to Resend:**
   - Go to [Resend Dashboard → Domains](https://resend.com/domains)
   - Click "Add Domain"
   - Enter your domain (e.g., `simplestepsfinance.com`)

2. **Add DNS records:**
   Resend will provide DNS records to add to your domain:
   ```
   TXT _resend.simplestepsfinance.com → "resend-verify=abc123..."
   MX simplestepsfinance.com → feedback-smtp.resend.com
   ```

3. **Update email configuration:**
   In `/src/app/api/send-quiz-results/route.ts`, change:
   ```typescript
   from: 'Simple Steps Finance <noreply@simplestepsfinance.com>',
   ```

### Option 2: Quick Production Test (Immediate)

If you want to test with real users right now:

1. **Use Resend's shared domain:**
   ```typescript
   from: 'Simple Steps Finance <hello@resend.dev>',
   ```

2. **This allows sending to any email address immediately**

### Option 3: Gmail/Google Workspace Integration

1. **Set up Google Workspace** for your domain
2. **Use Resend with your Gmail:**
   ```typescript
   from: 'Simple Steps Finance <noreply@simplestepsfinance.com>',
   ```

## Environment Variables

Make sure these are set in your production environment:

```bash
RESEND_API_KEY=[Your Resend API key]
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Vercel Environment Variables:
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY`: Your Resend API key
   - `NEXT_PUBLIC_APP_URL`: Your production URL

## Testing the Production Setup

### 1. Use the Debug Page
- Visit: `https://your-domain.com/debug-email`
- Check environment status
- Send test emails

### 2. Test Quiz Flow
- Complete the quiz with a real email
- Check browser console for logs
- Verify email delivery

### 3. Check Resend Dashboard
- View email logs at [resend.com/emails](https://resend.com/emails)
- Monitor delivery rates
- Check bounce/spam reports

## Current Email Features

✅ **Quiz Results Email:**
- Personalized based on financial stage
- Includes top 3 next steps
- Professional HTML template
- Stage-specific styling

✅ **Email Content:**
- User's financial stage and score
- Personalized recommendations
- Call-to-action to create account
- Responsive design

✅ **Error Handling:**
- Graceful fallbacks if email fails
- User still gets their results page
- Detailed logging for debugging

## Immediate Actions for Production

1. **Get a Resend API key** (if not already done):
   - Sign up at [resend.com](https://resend.com)
   - Get your API key from the dashboard

2. **Choose email approach:**
   - **Quick:** Use `hello@resend.dev` (works immediately)
   - **Professional:** Set up your own domain

3. **Update environment variables:**
   - Add `RESEND_API_KEY` to Vercel
   - Deploy the latest code

4. **Test with real users:**
   - Use `/debug-email` to verify setup
   - Try the full quiz flow

## Monitoring Email Delivery

### Resend Dashboard Metrics:
- **Delivered:** Successful email delivery
- **Bounced:** Invalid email addresses
- **Complained:** Marked as spam
- **Clicked:** Users clicked links in email

### Best Practices:
- Monitor bounce rates (keep under 5%)
- Watch spam complaints (keep under 0.1%)
- Use clear, relevant subject lines
- Include unsubscribe options for marketing emails

## Troubleshooting

### Common Issues:

1. **"Domain not verified"**
   - Complete DNS setup in Resend dashboard
   - Wait up to 24 hours for DNS propagation

2. **"Daily limit exceeded"**
   - Free Resend accounts have daily limits
   - Upgrade to paid plan for higher limits

3. **Emails going to spam**
   - Ensure domain is properly verified
   - Avoid spam trigger words
   - Include proper sender information

### Support:
- Resend Documentation: [resend.com/docs](https://resend.com/docs)
- Resend Support: [resend.com/support](https://resend.com/support)

## Next Steps

1. ✅ Set up production email domain
2. ✅ Test with real user emails  
3. ✅ Monitor delivery metrics
4. ✅ Set up email analytics (optional)
5. ✅ Add more email templates (welcome, progress updates, etc.)