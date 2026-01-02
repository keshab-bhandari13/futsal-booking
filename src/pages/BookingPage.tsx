import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { MOCK_COURTS, generateMockSlots } from '../services/mockData';
import { SlotGrid } from '../components/SlotGrid';
import { BookingSummary } from '../components/BookingSummary';
import { useBookingStore } from '../store/bookingStore';
import { Slot } from '../types';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const BookingPage: React.FC = () => {
  const { courtId } = useParams<{ courtId: string }>();
  const navigate = useNavigate();
  const { setSelectedCourt, clearSelectedSlots } = useBookingStore();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);

  const court = MOCK_COURTS.find((c) => c.id === courtId);

  useEffect(() => {
    if (court) {
      setSelectedCourt(court);
      // Generate slots for the selected date
      const mockSlots = generateMockSlots(court.id, selectedDate);
      setSlots(mockSlots);
      clearSelectedSlots();
    }
  }, [court, selectedDate, setSelectedCourt, clearSelectedSlots]);

  if (!court) {
    return <div className="p-8 text-center">Court not found</div>;
  }

  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        className="mb-6 pl-0 hover:bg-transparent hover:text-indigo-600"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Courts
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{court.name}</h1>
            <p className="text-gray-500 mt-2">{court.location}</p>
          </div>

          {/* Date Selection */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
              Select Date
            </h3>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {dates.map((date) => {
                const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg border min-w-[80px] transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-gray-200 hover:border-indigo-300 text-gray-700'
                    }`}
                  >
                    <span className="text-xs font-medium uppercase">{format(date, 'EEE')}</span>
                    <span className="text-lg font-bold">{format(date, 'd')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slots */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Available Slots</h3>
            <SlotGrid slots={slots} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BookingSummary />
        </div>
      </div>
    </div>
  );
};
