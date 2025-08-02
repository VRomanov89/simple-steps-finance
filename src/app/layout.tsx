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
        <body className="font-sans antialiased min-h-screen bg-gray-50">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
