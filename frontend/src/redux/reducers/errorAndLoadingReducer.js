import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    isLoading: false,
    error:'',
}

export const errorAndLoadingSlice = createSlice({
  name: 'errorAndLoading',
  initialState,
  reducers: {
    setError: (state, action) => {
        state.error = action.payload;
    },
    setLoading: (state,action) => {
        state.isLoading = action.payload;
    }


    }
})

export const { setLoading,setError} = errorAndLoadingSlice.actions

export default errorAndLoadingSlice.reducer
