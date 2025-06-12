const API_BASE_URL = '/api';

export async function fetchMatches() {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`);
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
}

export async function fetchMatchDetails(matchId) {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch match details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
}

export async function createBooking(bookingData) {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export async function fetchUserBookings(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user bookings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
}

export async function loginUser(credentials) {
  try {
    return {
      id: 'user_' + Math.random().toString(36).substring(2, 9),
      name: credentials.email.split('@')[0],
      email: credentials.email,
      token: 'mock_token_' + Math.random().toString(36).substring(2),
    };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
}