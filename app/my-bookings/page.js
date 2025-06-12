'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadUserBookings } from '../store/slices/bookingSlice';
import BookingCard from '../components/BookingCard';
import Header from '../components/Header';
import Link from 'next/link';
import Loader from '../components/Loader';

export default function MyBookingsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { bookings, loading, error } = useAppSelector((state) => state.bookings);

  useEffect(() => {
    if (user) {
      dispatch(loadUserBookings(user.id));
    }
  }, [user, dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1e3c] to-[#0b2b5a] text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="bg-gradient-to-b from-[#0a1e3c] to-[#0b2b5a] text-white rounded-xl shadow-md p-6 text-center">
            <p className="">You haven't booked any tickets yet.</p>
            <Link 
              href="/matches" 
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Browse Matches
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}