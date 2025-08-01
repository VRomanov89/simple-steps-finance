import type { Metadata } from "next";
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
    <html lang="en">
      <body className="font-sans antialiased">
        <div style={{ padding: '20px' }}>
          <h1>SimpleStepsFinance</h1>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
