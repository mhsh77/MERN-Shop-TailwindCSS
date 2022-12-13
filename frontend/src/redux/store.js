import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../redux/reducers/productReducer'

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
})