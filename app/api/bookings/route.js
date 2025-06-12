import { NextResponse } from 'next/server';

let bookings = [];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  const userBookings = bookings.filter(booking => booking.userId === userId);
  return NextResponse.json(userBookings);
}

export async function POST(request) {
  const bookingData = await request.json();
  
  const newBooking = {
    ...bookingData,
    id: 'booking_' + Math.random().toString(36).substring(2, 9),
    bookingDate: new Date().toISOString(),
  };
  
  bookings.push(newBooking);
  return NextResponse.json(newBooking);
}