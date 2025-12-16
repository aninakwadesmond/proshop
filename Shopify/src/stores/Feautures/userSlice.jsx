import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  users: [],
  current: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },

    getAlluser: (state, action) => {
      state.users = action.payload;
    },

    userToEdit: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setUserInfo, getAlluser, userToEdit } = userSlice.actions;
export default userSlice.reducer;
