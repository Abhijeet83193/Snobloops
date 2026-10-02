import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import playerReducer from '../features/player/playerSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
  },
});
