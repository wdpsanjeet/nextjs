'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadMatchDetails } from '../store/slices/matchSlice';
import { bookTickets } from '../store/slices/bookingSlice';
import SeatSelector from '../components/SeatSelector';
import PaymentModal from '../components/PaymentModal';
import Header from '../components/Header';
import Loader from '../components/Loader';

export default function BookTicketsPage() {
  const searchParams = useSearchParams();
  const matchId = searchParams.get('matchId');
  const dispatch = useAppDispatch();
  
  const { currentMatch, loading: matchLoading, error: matchError } = useAppSelector((state) => state.matches);
  const { user } = useAppSelector((state) => state.auth);
  const { loading: bookingLoading, error: bookingError } = useAppSelector((state) => state.bookings);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (matchId) {
      dispatch(loadMatchDetails(matchId));
    }
  }, [matchId, dispatch]);

  const handlePaymentSuccess = async (paymentDetails) => {
    if (!user || !currentMatch) return;
    
    await dispatch(bookTickets({
      userId: user.id,
      matchId: currentMatch.id,
      seats: selectedSeats,
      totalPrice: selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
      paymentDetails,
      matchDetails: {
        teams: `${currentMatch.teamA} vs ${currentMatch.teamB}`,
        date: currentMatch.date,
        venue: currentMatch.venue
      }
    }));
    
    setShowPaymentModal(false);
    // Redirect to bookings page or show success
  };

  if (matchLoading) return <Loader />;
  if (matchError) return <div>Error: {matchError}</div>;
  if (!currentMatch) return <div>Match not found</div>;

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1e3c] to-[#0b2b5a] text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentMatch.teamA} vs {currentMatch.teamB}
            </h1>
            <div className="text-gray-600 space-y-1 mb-4">
              <p>{new Date(currentMatch.date).toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p>{currentMatch.time} • {currentMatch.venue}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold mb-4">Select Seats</h2>
              <SeatSelector 
                selectedSeats={selectedSeats}
                onSeatSelect={setSelectedSeats}
              />
            </div>
          </div>
        </div>
        
        {selectedSeats.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sticky bottom-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  {selectedSeats.length} {selectedSeats.length === 1 ? 'Ticket' : 'Tickets'}
                </p>
                <p className="text-gray-600">₹{totalPrice}</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                disabled={bookingLoading}
                className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium ${bookingLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {bookingLoading ? 'Processing...' : 'Continue'}
              </button>
            </div>
          </div>
        )}
        
        {showPaymentModal && (
          <PaymentModal
            match={currentMatch}
            seats={selectedSeats}
            totalPrice={totalPrice}
            onSuccess={handlePaymentSuccess}
            onClose={() => setShowPaymentModal(false)}
          />
        )}
      </div>
    </div>
  );
}