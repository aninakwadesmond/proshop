import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  registerInfo: localStorage.getItem('registerInfo')
    ? JSON.parse(localStorage.getItem('registerInfo'))
    : null,
};

const registerSlice = createSlice({
  name: 'registerInfo',
  initialState,
  reducers: {
    setRegisterInfo: (state, action) => {
      state.registerInfo = action.payload;
      localStorage.setItem('registerInfo', JSON.stringify(action.payload));
    },
  },
});

export const { setRegisterInfo } = registerSlice.actions;
export default registerSlice.reducer;
