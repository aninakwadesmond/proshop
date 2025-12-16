import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: localStorage.getItem('orders')
    ? JSON.parse(localStorage.getItem('orders'))
    : [],
};

const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      const local = JSON.parse(localStorage.getItem('orders'));
      const newData = local ? local[0] : {};
      const response = { ...newData, ...action.payload };

      localStorage.setItem('orders', JSON.stringify([response]));
    },
  },
});

export const { setOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
