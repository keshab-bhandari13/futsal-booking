import React from 'react';
import { Badge } from '../components/ui/Badge';

// Mock bookings for admin
const MOCK_BOOKINGS = [
  { id: 'b1', customer: 'John Doe', court: 'Kathmandu Futsal Arena', time: '2023-12-28 10:00 AM', amount: 1200, status: 'confirmed' },
  { id: 'b2', customer: 'Jane Smith', court: 'Lalitpur Sports Center', time: '2023-12-28 06:00 PM', amount: 1500, status: 'pending' },
  { id: 'b3', customer: 'Bob Wilson', court: 'Bhaktapur Futsal Hub', time: '2023-12-29 07:00 AM', amount: 1000, status: 'failed' },
];
// Admin Dashboard Component
export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Overview of latest booking activities.</p>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_BOOKINGS.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.court}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {booking.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={
                      booking.status === 'confirmed' ? 'success' :
                      booking.status === 'pending' ? 'warning' : 'error'
                    }>
                      {booking.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
