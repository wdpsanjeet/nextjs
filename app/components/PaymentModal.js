'use client';

import { useState } from 'react';
import { useAppSelector } from '../store/hooks';

export default function PaymentModal({ match, seats, totalPrice, onSuccess, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        method: paymentMethod,
        status: 'success',
        transactionId: 'txn_' + Math.random().toString(36).substring(2, 10),
        amount: totalPrice,
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Complete Payment</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              disabled={isProcessing}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Order Summary</h4>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm font-medium">{match.teamA} vs {match.teamB}</p>
              <p className="text-xs text-gray-600 mt-1">
                {new Date(match.date).toLocaleDateString('en-IN')} • {match.venue}
              </p>
              <div className="mt-2 text-sm">
                <p>Seats: {seats.map(s => s.seat).join(', ')}</p>
                <p className="font-medium mt-1">Total: ₹{totalPrice}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Payment Method</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="upi"
                  name="paymentMethod"
                  type="radio"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="upi" className="ml-2 block text-sm text-gray-700">
                  UPI
                </label>
              </div>

              {paymentMethod === 'upi' && (
                <div className="ml-6">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              )}

              <div className="flex items-center">
                <input
                  id="card"
                  name="paymentMethod"
                  type="radio"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="card" className="ml-2 block text-sm text-gray-700">
                  Credit/Debit Card
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="ml-6 space-y-3">
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    placeholder="Card Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    placeholder="Name on Card"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      placeholder="MM/YY"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      placeholder="CVV"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isProcessing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay ₹${totalPrice}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}