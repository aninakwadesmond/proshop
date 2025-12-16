import { createSlice } from '@reduxjs/toolkit';
const initialState = { open: false };

const responsiveSlice = createSlice({
  name: 'responsive',
  initialState,
  reducers: {
    setOpen: (state) => {
      console.log(state.open);
      state.open = !state.open;
    },
  },
});

export const { setOpen } = responsiveSlice.actions;
export default responsiveSlice.reducer;
