import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PaymentSuccess: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
        <p className="mt-2 text-lg text-gray-600">
          Your booking has been confirmed. You will receive a confirmation email shortly.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button size="lg">Book Another Slot</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
