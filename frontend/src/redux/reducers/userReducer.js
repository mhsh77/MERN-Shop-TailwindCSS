import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        user:null,
        loggedIn:false
    },
    reducers: {
        setUser:(state,action) => {
            state.user = action.payload
            state.loggedIn = true
        },
        userLogout: (state,action) => {
            state.user = null
            state.loggedIn = false
        }
    }
    
},

)
export const { setLoading , setUser , userLogout } = authenticationSlice.actions;
export default authenticationSlice.reducer