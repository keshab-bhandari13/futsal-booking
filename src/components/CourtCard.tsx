import React from 'react';
import { MapPin, Check } from 'lucide-react';
import { Court } from '../types';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';

interface CourtCardProps {
  court: Court;
}

export const CourtCard: React.FC<CourtCardProps> = ({ court }) => {
  const navigate = useNavigate();
  const setSelectedCourt = useBookingStore((state) => state.setSelectedCourt);

  const handleBookNow = () => {
    setSelectedCourt(court);
    navigate(`/book/${court.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 w-full overflow-hidden">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{court.name}</h3>
            <div className="flex items-center mt-1 text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{court.location}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-indigo-600">Rs. {court.pricePerHour}</span>
            <span className="text-sm text-gray-500">/hr</span>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 text-sm line-clamp-2">{court.description}</p>
        
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {court.amenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700"
              >
                <Check className="h-3 w-3 mr-1 text-green-500" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          
          <Button onClick={handleBookNow} className="w-full">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};
