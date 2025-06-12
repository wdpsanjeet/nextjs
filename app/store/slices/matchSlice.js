import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMatches, fetchMatchDetails } from '../../lib/api';

export const loadMatches = createAsyncThunk(
  'matches/loadMatches',
  async () => {
    const response = await fetchMatches();
    return response;
  }
);

export const loadMatchDetails = createAsyncThunk(
  'matches/loadMatchDetails',
  async (matchId) => {
    const response = await fetchMatchDetails(matchId);
    return response;
  }
);

const matchSlice = createSlice({
  name: 'matches',
  initialState: {
    matches: [],
    currentMatch: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMatches.fulfilled, (state, action) => {
        state.matches = action.payload;
        state.loading = false;
      })
      .addCase(loadMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadMatchDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMatchDetails.fulfilled, (state, action) => {
        state.currentMatch = action.payload;
        state.loading = false;
      })
      .addCase(loadMatchDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default matchSlice.reducer;