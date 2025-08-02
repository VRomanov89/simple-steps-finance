import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import "./globals.css";

export const metadata: Metadata = {
  title: "SimpleStepsFinance - Master Your Money, One Simple Step at a Time",
  description: "Take control of your finances with a personalized roadmap, simple tools, and steady progress. Built for real people, not finance experts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
          margin: 0,
          padding: 0
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}>
            <Header />
            <main style={{
              flex: 1,
              paddingTop: '4.5rem'
            }}>
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
