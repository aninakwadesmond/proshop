import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: false, admin: false };

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setUser: (state) => {
      if (state.admin) state.admin = false;
      state.user = !state.user;
    },
    setAdmin: (state) => {
      if (state.user) state.user = false;
      // if(state.user === true){
      //   state.user =
      // }
      state.admin = !state.admin;
    },
  },
});

export const { setAdmin, setUser } = navigationSlice.actions;
export default navigationSlice.reducer;
