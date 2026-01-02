import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PaymentFailure: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Failed</h2>
        <p className="mt-2 text-lg text-gray-600">
          We couldn't process your payment. Please try again.
        </p>
        <div className="mt-8 space-x-4">
          <Link to="/">
            <Button variant="outline" size="lg">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
