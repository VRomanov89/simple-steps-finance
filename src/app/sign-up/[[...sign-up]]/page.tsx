import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Get started today</h2>
          <p className="mt-2 text-gray-600">Create your account and take control of your finances</p>
        </div>
        <SignUp
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