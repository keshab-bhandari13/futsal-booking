import React from 'react';
import { MOCK_COURTS } from '../services/mockData';
import { CourtCard } from '../components/CourtCard';

export const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Book Your Futsal Slot
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Find and book the best futsal courts in your area instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_COURTS.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>
    </div>
  );
};
