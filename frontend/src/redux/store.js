import { configureStore } from '@reduxjs/toolkit'
import productsReducers from '../redux/reducers/productsReducer'
import errorAndLoadingReducer from './reducers/errorAndLoadingReducer'
import signleProductReducer from './reducers/signleProductReducer'
import  authenticationReducer  from './reducers/userReducer'
import cartReducer from './reducers/cartReducer'
export const store = configureStore({
  reducer: {
    products: productsReducers,
    singleProduct:signleProductReducer,
    errorAndLoading:errorAndLoadingReducer,
    authentication:authenticationReducer,
    cart:cartReducer
  },
})