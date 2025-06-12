import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import matchReducer from './slices/matchSlice';
import bookingReducer from './slices/bookingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  matches: matchReducer,
  bookings: bookingReducer,
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // Key for localStorage
  storage, // Which storage to use (localStorage, sessionStorage, etc.)
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);