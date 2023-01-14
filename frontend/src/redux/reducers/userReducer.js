import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        user:null,
        loggedIn:false,
        role:''
    },
    reducers: {
        setUser:(state,action) => {
            console.log(action.payload.role);
            state.user = action.payload
            state.loggedIn = true
            state.role = action.payload.role
        },
        userLogout: (state,action) => {
            state.user = null
            state.loggedIn = false
            state.role = null
        }
    }
    
},

)
export const { setLoading , setUser , userLogout } = authenticationSlice.actions;
export default authenticationSlice.reducer