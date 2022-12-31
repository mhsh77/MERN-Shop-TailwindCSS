import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        user:null,
    },
    reducers: {
        setUser:(state,action) => {
            state.user = action.payload
        },
        userLogout: (state,action) => {
            state.user = null
        }
    }
    
},

)
export const { setLoading , setUser , userLogout } = authenticationSlice.actions;
export default authenticationSlice.reducer