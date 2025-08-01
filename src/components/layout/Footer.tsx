import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="font-bold text-xl text-gray-900">SimpleStepsFinance</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Master your money, one simple step at a time. Built for real people, not finance experts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Get Started</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/quiz" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Take Quiz
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © 2024 SimpleStepsFinance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}