import { create } from 'zustand';
import { Court, Slot, Booking } from '../types';

interface BookingState {
  selectedCourt: Court | null;
  selectedSlots: Slot[];
  bookingDetails: {
    name: string;
    email: string;
    phone: string;
  };
  setSelectedCourt: (court: Court | null) => void;
  toggleSlotSelection: (slot: Slot) => void;
  clearSelectedSlots: () => void;
  setBookingDetails: (details: { name: string; email: string; phone: string }) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedCourt: null,
  selectedSlots: [],
  bookingDetails: {
    name: '',
    email: '',
    phone: '',
  },
  setSelectedCourt: (court) => set({ selectedCourt: court, selectedSlots: [] }),
  toggleSlotSelection: (slot) =>
    set((state) => {
      const isSelected = state.selectedSlots.some((s) => s.id === slot.id);
      if (isSelected) {
        return { selectedSlots: state.selectedSlots.filter((s) => s.id !== slot.id) };
      } else {
        // Ensure slot belongs to the same court (though UI should prevent this)
        if (state.selectedCourt && slot.courtId !== state.selectedCourt.id) return state;
        return { selectedSlots: [...state.selectedSlots, slot] };
      }
    }),
  clearSelectedSlots: () => set({ selectedSlots: [] }),
  setBookingDetails: (details) => set({ bookingDetails: details }),
  resetBooking: () =>
    set({
      selectedCourt: null,
      selectedSlots: [],
      bookingDetails: { name: '', email: '', phone: '' },
    }),
}));
