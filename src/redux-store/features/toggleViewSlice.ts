
import { createSlice } from '@reduxjs/toolkit';

const toggleViewSlice = createSlice({
  name: 'toggleView',
  initialState: { value: false },
  reducers: {
    toggle: (state) => {
      state.value = !state.value; 
    },
  },
});

export const { toggle } = toggleViewSlice.actions;
export default toggleViewSlice.reducer;
