import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';

export const store = configureStore({
  reducer: {
    events: eventReducer,
  },
  // This is needed to allow non-serializable Date objects in state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});