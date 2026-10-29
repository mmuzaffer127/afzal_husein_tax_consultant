import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-7xl sm:text-8xl font-bold text-teal/10">404</p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
            Page Not Found
          </h1>
          <p className="mt-3 text-sm text-charcoal/50 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-charcoal/60 border border-border rounded-lg hover:bg-offwhite transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
