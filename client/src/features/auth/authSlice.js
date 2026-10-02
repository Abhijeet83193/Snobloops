import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('snobloops_token');

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: token || null, user: null },
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user || null;
      localStorage.setItem('snobloops_token', action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('snobloops_token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
