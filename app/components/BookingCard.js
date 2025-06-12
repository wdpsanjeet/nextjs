import Link from 'next/link';
import Image from 'next/image';

export default function BookingCard({ booking }) {
  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Booking ID: {booking.id.substring(0, 8)}</h3>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            {booking.paymentDetails?.status || 'Confirmed'}
          </span>
        </div>
        <p className="text-xs mt-1">{formatDate(booking.bookingDate)}</p>
      </div>

      <div className="p-4">
        <h4 className="font-medium text-gray-900">{booking.matchDetails.teams}</h4>
        <p className="text-sm text-gray-600 mt-1">
          {formatDate(booking.matchDetails.date)} • {booking.matchDetails.venue}
        </p>

        <div className="mt-4 border-t border-gray-200 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Seats:</span>
            <span className="font-medium">
              {booking.seats.map(s => s.seat).join(', ')}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">Total:</span>
            <span className="font-medium">₹{booking.totalPrice}</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Link
            href={`/book-tickets?matchId=${booking.matchId}`}
            className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Book Again
          </Link>
          <button
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}