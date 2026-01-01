import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useBookingStore } from '../store/bookingStore';
import { Button } from './ui/Button';
import { Loader2 } from 'lucide-react';

export const BookingSummary: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCourt, selectedSlots, bookingDetails, setBookingDetails, resetBooking } = useBookingStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call to initiate payment
    setTimeout(() => {
      setIsProcessing(false);
      // In a real app, we would redirect to Khalti payment URL here
      // For now, we simulate a successful payment redirect
      navigate('/payment/success');
      resetBooking();
    }, 2000);
  };

  if (!selectedCourt || selectedSlots.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Court</span>
          <span className="font-medium text-gray-900">{selectedCourt.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Slots</span>
          <span className="font-medium text-gray-900">{selectedSlots.length} selected</span>
        </div>
        
        <div className="border-t border-gray-100 pt-4 space-y-2">
          {selectedSlots.map((slot) => (
            <div key={slot.id} className="flex justify-between text-xs text-gray-600">
              <span>{format(parseISO(slot.startTime), 'MMM d, h:mm a')}</span>
              <span>Rs. {slot.price}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-indigo-600">Rs. {totalAmount}</span>
        </div>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            value={bookingDetails.name}
            onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            value={bookingDetails.email}
            onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            value={bookingDetails.phone}
            onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay with Khalti'
          )}
        </Button>
        <p className="text-xs text-center text-gray-500 mt-2">
          You will be redirected to Khalti to complete payment.
        </p>
      </form>
    </div>
  );
};

