import { createSlice } from '@reduxjs/toolkit';

const initialState = { productDetails: {} };

const DetailsSlice = createSlice({
  name: 'detials',
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },
});

export const { setDetails } = DetailsSlice.actions;
export default DetailsSlice.reducer;
