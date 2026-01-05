import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useBookingStore } from '../store/bookingStore';
import { Button } from './ui/Button';
import { Loader2, Upload, QrCode } from 'lucide-react';
// BookingSummary component to display booking details and handle payment
export const BookingSummary: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCourt, selectedSlots, bookingDetails, setBookingDetails, resetBooking } = useBookingStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const totalAmount = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
