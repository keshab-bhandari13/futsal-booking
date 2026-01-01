import React from 'react';
import { format, parseISO } from 'date-fns';
import { Slot } from '../types';
import { cn } from './ui/Button';
import { useBookingStore } from '../store/bookingStore';

interface SlotGridProps {
  slots: Slot[];
}

export const SlotGrid: React.FC<SlotGridProps> = ({ slots }) => {
  const { selectedSlots, toggleSlotSelection } = useBookingStore();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {slots.map((slot) => {
        const isSelected = selectedSlots.some((s) => s.id === slot.id);
        const isAvailable = slot.status === 'available';
        const isBooked = slot.status === 'booked';
        const isLocked = slot.status === 'locked';

        return (
          <button
            key={slot.id}
            disabled={!isAvailable}
            onClick={() => toggleSlotSelection(slot)}
            className={cn(
              'relative flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-medium transition-all duration-200',
              isAvailable && !isSelected && 'bg-white border-gray-200 hover:border-indigo-500 hover:shadow-sm text-gray-900',
              isSelected && 'bg-indigo-600 border-indigo-600 text-white shadow-md ring-2 ring-indigo-200',
              isBooked && 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed',
              isLocked && 'bg-yellow-50 border-yellow-200 text-yellow-600 cursor-not-allowed'
            )}
          >
            <span className="text-base font-bold">
              {format(parseISO(slot.startTime), 'h:mm a')}
            </span>
            <span className="text-xs mt-1 opacity-80">
              Rs. {slot.price}
            </span>
            
            {isBooked && (
              <span className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full">
                Booked
              </span>
            )}
            {isLocked && (
              <span className="absolute -top-2 -right-2 bg-yellow-100 text-yellow-700 text-[10px] px-1.5 py-0.5 rounded-full">
                Reserved
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
