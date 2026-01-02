export interface Court {
  id: string;
  name: string;
  location: string;
  image: string;
  pricePerHour: number;
  description: string;
  amenities: string[];
}

export type SlotStatus = 'available' | 'booked' | 'locked' | 'selected';

export interface Slot {
  id: string;
  courtId: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  price: number;
  status: SlotStatus;
}

export interface Booking {
  id: string;
  courtId: string;
  slotIds: string[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'failed';
  paymentMethod: 'khalti';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
}

export interface PaymentInitiateResponse {
  pidx: string;
  payment_url: string;
  expires_at: string;
  expires_in: number;
}
