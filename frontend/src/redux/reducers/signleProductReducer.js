import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    product: '',
    
}

export const signleProductSlice = createSlice({
  name: 'signleProduct',
  initialState,
  reducers: {
    fetchProduct: (state, action) => {
      console.log(action.payload);
        state.product = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { fetchProduct } = signleProductSlice.actions

export default signleProductSlice.reducer