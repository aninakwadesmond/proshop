import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ProductItems: localStorage.getItem('product')
    ? JSON.parse(localStorage.getItem('product'))
    : [],
  productToEdit: {},
};

const CreateProduct = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.ProductItems = action.payload;
    },
    addProducts: (state, action) => {
      // console.log('producers', initialState.ProductItems, action.payload);
      state.ProductItems = [...state.ProductItems, ...action.payload].filter(
        (obj, index, self) => index === self.findIndex((o) => o._id === obj._id)
      );
      // localStorage.setItem('products', JSON.stringify(state.ProductItems));
    },
    EditProduct: (state, action) => {
      state.productToEdit = action.payload;
    },
  },
});

export const { addProducts, EditProduct, getProduct } = CreateProduct.actions;
export default CreateProduct.reducer;
