'use client';

import { ClerkProvider as BaseClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorPrimary: '#2563eb',
          colorBackground: '#ffffff',
          colorText: '#111827',
          colorTextSecondary: '#6b7280',
          colorAlphaShade: '#f3f4f6',
          colorInputBackground: '#ffffff',
          colorInputText: '#111827',
          borderRadius: '0.75rem',
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/quiz"
    >
      {children}
    </BaseClerkProvider>
  );
}