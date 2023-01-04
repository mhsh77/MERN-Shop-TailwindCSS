import { createSlice } from "@reduxjs/toolkit";

export const shippingSlice = createSlice({
    name:'shipping',
    initialState:{
        addresses:[],
        prevadd:false,
    },
    reducers: {
        addAddress: (state, action) => {
            console.log(action.payload);
            let addresses = [...state.addresses];
            
            let address={
                "address":action.payload.address,
                "city":action.payload.city,
                "postalCo":action.payload.zipCode,
                "phoneNo":action.payload.phoneNo,
                "country":action.payload.country
            }
            addresses.push(address)
            state.prevadd = true
            state.addresses = addresses
            
            
          }
        
    }
    
},

)
export const { addAddress } = shippingSlice.actions;
export default shippingSlice.reducer