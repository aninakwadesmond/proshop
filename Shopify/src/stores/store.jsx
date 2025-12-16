import { configureStore } from '@reduxjs/toolkit';
import DetailsSliceReducer from '../stores/Feautures/Details';
import CartSliceReducer from '../stores/Feautures/CartSlice';
import userSliceReducer from '../stores/Feautures/userSlice';
import registerSliceReducer from '../stores/Feautures/registerSlice';
import OrderSliceReducer from '../stores/Feautures/Order';
import CreateProductReducer from '../stores/Feautures/Products';
import navigationSliceReducer from '../stores/Feautures/Navigation';
import responsiveSliceReducer from '../stores/Feautures/responsive';

const store = configureStore({
  reducer: {
    details: DetailsSliceReducer,
    cartItems: CartSliceReducer,
    userInfo: userSliceReducer,
    register: registerSliceReducer,
    orders: OrderSliceReducer,
    products: CreateProductReducer,
    nav: navigationSliceReducer,
    responsive: responsiveSliceReducer,
  },
});

export default store;
