import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItem: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [
        // {
        //   cartItem: [],
        //   totalCost: 0,
        //   contain: {},
        //   shipppingAddress: {},
        //   paymentMethods: 'Paypal',
        // },
      ],
  totalCost: 0,
  contain: {},
  shipppingAddress: {},
  paymentMethods: 'Paypal',
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToChart: (state, action) => {
      console.log(initialState);
      console.log('action', action.payload, state.cartItem);
      console.log('state ', initialState['cartItem']);
      console.log('not itterateable', state.cartItem);
      // const value = state.cartItem[0].cart ? [...state.cartItem , action.payload]:[...state.cartItem[0].cart, action.payload]
      const container = state.cartItem[0]?.cart
        ? [...state.cartItem[0].cart, action.payload]
        : [...state.cartItem, action.payload];
      console.log('container before save', container);
      state.cartItem = container
        .map((el) => (el._id === action.payload._id ? action.payload : el))
        .filter(
          (obj, index, self) =>
            index === self.findIndex((o) => o._id === obj._id)
        );
      state.cartItem = state.cartItem.map((cart) => {
        const itemPrice = (cart.price * cart.quantity).toFixed(2);
        const shippingPrice = itemPrice > 100 ? 0 : 10;
        const taxPrice = (itemPrice * 0.15).toFixed(2);
        const finalPrice =
          Number(itemPrice) + Number(shippingPrice) + Number(taxPrice);
        localStorage.setItem('cart', JSON.stringify(state.cartItem));
        return { ...cart, itemPrice, shippingPrice, taxPrice, finalPrice };
      });
      const containerItems = state.cartItem[0]?.cart
        ? [...state.cartItem[0].cart]
        : [...state.cartItem];
      state.totalCost = containerItems.reduce((a, c) => a + c.finalPrice, 0);
      state.totalCost = state.cartItem.reduce(
        (acc, cur) => acc + cur.finalPrice,
        0
      );
    },
    setShippingAddress: (state, action) => {
      state.shipppingAddress = action.payload;
      const cart = JSON.parse(localStorage.getItem('cart'));
      localStorage.setItem(
        'cart',
        JSON.stringify([{ cart, shippingAddress: action.payload }])
      );
    },
    removeCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (obj) => obj._id !== action.payload._id
      );
      const container = state.cartItem[0]?.cart
        ? [...state.cartItem[0].cart]
        : [...state.cartItem];
      state.totalCost = container.reduce((a, c) => a + c.finalPrice, 0);
    },

    setPaymentMethod: (state, action) => {
      console.log(action, action.payload);
      // const container = state.cartItem[0]?.cart
      //   ? [state.cartItem[0].cart, action.payload]
      //   : [...state.cartItem, action.payload];
      state.paymentMethods = action.payload;
      const currentCArt = JSON.parse(localStorage.getItem('cart'));
      const obj = currentCArt[0];
      const updateCart = { ...obj, paymentMethod: action.payload };
      localStorage.setItem('cart', JSON.stringify([updateCart]));
    },
    clearCart: (state) => {
      state.cartItem = [];
      const currentCArt = JSON.parse(localStorage.getItem('cart'));
      const obj = currentCArt[0];
      const updateCart = { ...obj, cartItem: [] };
      localStorage.setItem('cart', JSON.stringify([updateCart]));
    },
  },
});

export const { addToChart, removeCart, setPaymentMethod, setShippingAddress } =
  CartSlice.actions;

export default CartSlice.reducer;
