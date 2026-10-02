import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: { currentTrack: null, isPlaying: false },
  reducers: {
    setTrack(state, action) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    stop(state) {
      state.currentTrack = null;
      state.isPlaying = false;
    },
  },
});

export const { setTrack, togglePlay, stop } = playerSlice.actions;
export default playerSlice.reducer;
