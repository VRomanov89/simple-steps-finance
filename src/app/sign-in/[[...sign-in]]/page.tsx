import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to continue your financial journey</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary-500 hover:bg-primary-600 text-sm normal-case',
              card: 'shadow-lg',
            },
          }}
        />
      </div>
    </div>
  );
}