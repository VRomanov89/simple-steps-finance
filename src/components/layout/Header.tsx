'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserButton, useUser } from '@clerk/nextjs';
import Button from '@/components/ui/Button';

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <span className="font-bold text-xl text-gray-900">SimpleStepsFinance</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/quiz" className="text-gray-600 hover:text-primary-600 transition-colors">
              Take Quiz
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">
              Pricing
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-primary-600 transition-colors">
              Resources
            </Link>
            {isSignedIn && (
              <Link href="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
                afterSignOutUrl="/"
              />
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button size="sm">
                    Start Free Quiz
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}