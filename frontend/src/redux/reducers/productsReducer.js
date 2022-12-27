import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    productsCount: 0,
    value:0,
    count:0
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      console.log(action.payload);
        state.products = action.payload.products;
        state.productsCount = action.payload.productCount;
        state.count = action.payload.count;
    },
    
    setValue:(state, action)=> {
      state.value = action.payload;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { fetchProducts,setValue } = productsSlice.actions

export default productsSlice.reducer