import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orders: []
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchorders: (state, action) => {
      console.log(action.payload);
        state.orders = action.payload.orders;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { fetchorders,setValue } = ordersSlice.actions

export default ordersSlice.reducer