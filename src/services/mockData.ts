import { Court, Slot } from '../types';
import { addDays, setHours, setMinutes, format, addHours } from 'date-fns';

export const MOCK_COURTS: Court[] = [
  {
    id: 'c1',
    name: 'Kathmandu Futsal Arena',
    location: 'Baneshwor, Kathmandu',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000',
    pricePerHour: 1200,
    description: 'Premier futsal court with FIFA standard turf and night lighting.',
    amenities: ['Parking', 'Showers', 'Changing Room', 'Cafe'],
  },
  {
    id: 'c2',
    name: 'Lalitpur Sports Center',
    location: 'Jhamsikhel, Lalitpur',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1000',
    pricePerHour: 1500,
    description: 'Indoor arena with high-quality synthetic grass and ample seating.',
    amenities: ['Parking', 'Locker Room', 'Water Station'],
  },
  {
    id: 'c3',
    name: 'Bhaktapur Futsal Hub',
    location: 'Suryabinayak, Bhaktapur',
    image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&q=80&w=1000',
    pricePerHour: 1000,
    description: 'Affordable and accessible futsal court for local tournaments.',
    amenities: ['Parking', 'First Aid'],
  },
];

export const generateMockSlots = (courtId: string, date: Date): Slot[] => {
  const slots: Slot[] = [];
  const startHour = 6; // 6 AM
  const endHour = 22; // 10 PM

  for (let i = startHour; i < endHour; i++) {
    const startTime = setMinutes(setHours(date, i), 0);
    const endTime = addHours(startTime, 1);
    
    // Randomly assign status for demo purposes
    const rand = Math.random();
    let status: 'available' | 'booked' | 'locked' = 'available';
    if (rand > 0.8) status = 'booked';
    else if (rand > 0.95) status = 'locked';

    slots.push({
      id: `${courtId}-${format(startTime, 'yyyyMMdd-HH')}`,
      courtId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      price: i >= 18 ? 1500 : 1200, // Higher price for evening
      status: status as any,
    });
  }
  return slots;
};
