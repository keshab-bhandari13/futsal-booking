import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useBookingStore } from '../store/bookingStore';
import { Button } from './ui/Button';
import { Loader2, Upload, QrCode } from 'lucide-react';

export const BookingSummary: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCourt, selectedSlots, bookingDetails, setBookingDetails, resetBooking } = useBookingStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const totalAmount = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async () => {
    if (!screenshot) return;
    
    setIsProcessing(true);

    // Simulate API call to upload screenshot and create booking
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment/success');
      resetBooking();
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
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

      {!showPaymentModal ? (
        <form onSubmit={handleInitiatePayment} className="space-y-4">
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
          >
            Proceed to Payment
          </Button>
        </form>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-center">
            <h4 className="text-sm font-semibold text-purple-900 mb-2 flex items-center justify-center">
              <QrCode className="h-4 w-4 mr-2" />
              Scan & Pay with Khalti
            </h4>
            <div className="bg-white p-2 inline-block rounded-lg shadow-sm mb-2">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KhaltiPaymentDemo" 
                alt="Khalti QR Code" 
                className="h-32 w-32"
              />
            </div>
            <p className="text-xs text-purple-700">
              Scan this QR code using your Khalti app to pay <strong>Rs. {totalAmount}</strong>
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Payment Screenshot
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors">
              <div className="space-y-1 text-center">
                {screenshot ? (
                  <div className="text-sm text-gray-900 font-medium">
                    {screenshot.name}
                    <button 
                      onClick={() => setScreenshot(null)}
                      className="block mx-auto mt-2 text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowPaymentModal(false)}
            >
              Back
            </Button>
            <Button
              className="flex-1 bg-purple-700 hover:bg-purple-800"
              disabled={!screenshot || isProcessing}
              onClick={handleConfirmPayment}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Confirm Payment'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
