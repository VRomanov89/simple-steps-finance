# SimpleStepsFinance 💰

A modern, full-stack SaaS application that helps lower-middle-class individuals assess their financial health, follow a personalized roadmap, and track their progress.

## ✨ Features

- **Financial Assessment Quiz**: 8-question quiz to determine user's financial stage
- **8-Stage Progression System**: From "Buried in Debt" to "FIRE Ready"
- **Personalized Roadmaps**: Custom action plans for each financial stage
- **Progress Tracking**: Dashboard with milestones and progress visualization
- **Secure Authentication**: Email, Google, and Facebook sign-in via Clerk
- **Subscription Management**: Monthly/yearly plans with Stripe integration
- **Responsive Design**: Beautiful UI with Framer Motion animations

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Authentication**: Clerk (Google, Facebook, email/password)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Payments**: Stripe Checkout & Webhooks
- **Email**: Resend for transactional emails
- **Deployment**: Vercel

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <your-repo>
cd simple-steps-finance
npm install
```

### 2. Set Up Environment Variables
```bash
npm run setup
```
This interactive script will help you configure all required environment variables.

### 3. Run Database Migration
Copy and run the SQL from `supabase/migrations/001_initial_schema.sql` in your Supabase dashboard.

### 4. Start Development Server
```bash
npm run dev
```

### 5. Deploy to Vercel
See `QUICK-START.md` for deployment instructions.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes & webhooks
│   ├── dashboard/         # Protected user dashboard
│   ├── pricing/           # Subscription plans
│   ├── quiz/             # Financial assessment
│   └── results/          # Quiz results & CTA
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── layout/           # Header, Footer
│   ├── quiz/             # Quiz-specific components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utility functions
│   ├── supabase.ts       # Database client
│   ├── stripe.ts         # Payment processing
│   └── database.ts       # Database operations
├── types/                # TypeScript interfaces
└── constants/            # Quiz questions & stages
```

## 🎯 User Journey

1. **Discovery**: User lands on homepage and learns about the product
2. **Assessment**: Takes 8-question financial quiz
3. **Results**: Sees their financial stage and gets personalized recommendations
4. **Conversion**: Signs up for Pro plan to access full roadmap
5. **Engagement**: Uses dashboard to track progress and complete action items
6. **Growth**: Moves through financial stages with guided steps

## 🔒 Security Features

- Row Level Security (RLS) on all database tables
- Secure API routes with authentication checks
- Webhook signature verification
- Environment variable protection
- HTTPS everywhere (via Vercel)

## 📊 Financial Stages

1. **Buried in Debt** (0-5 points): Overwhelmed by debt and stress
2. **Stabilizing** (6-8 points): Starting to catch up, still paycheck-to-paycheck
3. **Budget Beginner** (9-11 points): Building structure, new to tracking
4. **Debt Destroyer** (12-14 points): Actively paying down balances
5. **Safety Net Builder** (15-17 points): Emergency fund growing
6. **Smart Saver** (18-20 points): Regular budgeting and early investing
7. **Wealth Strategist** (21-22 points): Multi-goal planning
8. **FIRE Ready** (23-24 points): Financially independent or close to it

## 💳 Pricing

- **Free**: Quiz access, basic stage summary, resources
- **Pro ($9/month or $90/year)**: Full roadmap, progress tracking, premium features

## 🔧 Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Check TypeScript
npm run setup      # Configure environment variables
```

## 🚀 Deployment

1. **Quick Deploy**: See `QUICK-START.md`
2. **Detailed Guide**: See `DEPLOYMENT.md`
3. **One-Click Vercel**: 
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/simple-steps-finance)

## 📞 Support

- Check `DEPLOYMENT.md` for troubleshooting
- Review browser console for errors
- Verify all environment variables are set
- Check service dashboards (Clerk, Supabase, Stripe) for issues

## 🎉 What's Next?

This MVP includes all core features for launch. Future enhancements could include:

- Advanced progress analytics
- Community features
- Additional financial calculators
- Mobile app
- Coaching integration
- Referral system

---

Built with ❤️ for people who want to take control of their finances, one simple step at a time.
