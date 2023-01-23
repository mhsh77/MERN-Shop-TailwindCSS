import { createSlice } from "@reduxjs/toolkit";
import { Card } from "flowbite-react";

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[],
        totalPrice:0,
        totalNum:0
    },
    reducers: {
        addProductToCart: (state, action) => {
            console.log(action.payload);
            let cart = [...state.cart];
            let itemInCart = cart.find((item)=>action.payload.product._id === item._id)
            if(itemInCart){
                itemInCart.quantity+=action.payload.quantity;
            }else{
                itemInCart={
                    "product":action.payload.product._id,
                    "image":action.payload.product.images[0],
                    "name":action.payload.product.name,
                    "price":action.payload.product.price,
                    "_id":action.payload.product._id,
                    "quantity":action.payload.quantity
                }
                cart.push(itemInCart)
            }
            state.cart = cart
            state.totalNum = cart.reduce((sum,{quantity}) => sum+quantity,0) 
            state.totalPrice = cart.reduce((sum,{quantity,price}) => sum+quantity*price,0)
            
          },
          setCart: (state, action) => {
            state.cart = action.payload;
          },
          removeProductFromCart: (state, action) => {
            let cart = [...state.cart];
            let itemInCart = cart.find((item)=>action.payload.product._id === item._id)

            function id(item) {
                return item._id !== action.payload.product._id
            }
            if(itemInCart){
                cart = cart.filter(id)
            }
            state.cart = cart
            state.totalNum = cart.reduce((sum,{quantity}) => sum+quantity,0) 
            state.totalPrice = cart.reduce((sum,{quantity,price}) => sum+quantity*price,0)
            
          },
          emptyCart: (state) => {
            state.cart = [];
          },
        
    }
    
},

)
export const { addProductToCart , setCart,removeProductFromCart , emptyCart} = cartSlice.actions;
export default cartSlice.reducer