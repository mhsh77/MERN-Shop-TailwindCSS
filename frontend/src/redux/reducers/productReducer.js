import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    productsCount: 0,
    isLoading: false,
    error:'',
    value:0,
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
    setValue:(state, action)=> {
      state.value = action.payload;
    },
    setError: (state, action) => {
      console.log("set error",action);
      state.error = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { fetchProducts,setLoading,removeProduct,setError,setValue } = productSlice.actions

export default productSlice.reducer