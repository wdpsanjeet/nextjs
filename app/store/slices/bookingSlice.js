import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBooking, fetchUserBookings } from '../../lib/api';

export const bookTickets = createAsyncThunk(
  'bookings/bookTickets',
  async (bookingData) => {
    const response = await createBooking(bookingData);
    return response;
  }
);

export const loadUserBookings = createAsyncThunk(
  'bookings/loadUserBookings',
  async (userId) => {
    const response = await fetchUserBookings(userId);
    return response;
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookTickets.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.loading = false;
      })
      .addCase(bookTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(loadUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookingSlice.reducer;