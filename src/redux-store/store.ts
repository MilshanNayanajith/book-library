import { configureStore } from '@reduxjs/toolkit';
import toggleViewReducer from '../redux-store/features/toggleViewSlice';

export const store = configureStore({
  reducer: {
    toggleView: toggleViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;