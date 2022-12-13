import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    productsCount: 0,
    isLoading: false,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
        state.products = action.payload.products;
        state.isLoading = false;
        state.productsCount = action.payload.productCount;
    },
    setLoading: (state, action) => {
        state.isLoading = action.payload;
      },
    removeProduct: (state, action) => {
        state.products = state.products.filter(
            (product) => product._id !== action.payload._id
        );
        state.isLoading = false;
        state.productMessage = action.payload.data;
    },

  },
})

// Action creators are generated for each case reducer function
export const { fetchProducts,setLoading,removeProduct } = productSlice.actions

export default productSlice.reducer