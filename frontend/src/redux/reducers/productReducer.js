import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    productsCount: 0,
    isLoading: false,
    error:null
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      console.log(action.payload);
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
    setError: (state, action) => {
      state.error = action.payload.error;
    }

  },
})

// Action creators are generated for each case reducer function
export const { fetchProducts,setLoading,removeProduct,setError } = productSlice.actions

export default productSlice.reducer