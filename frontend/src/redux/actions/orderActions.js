import axios from "axios"
import { setError, setLoading } from "../reducers/errorAndLoadingReducer"

export const newOrder = (orderItems,shippingInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paymentInfo) => async (dispatch) => {
    dispatch(setLoading(true))
    console.log({"orderItems":orderItems,"shippingInfo":shippingInfo,"itemsPrice":itemsPrice,"taxPrice":taxPrice,"shippingPrice":shippingPrice,"totalPrice":totalPrice,"paymentInfo":paymentInfo});
    axios.post('/api/v1/order/new',{"orderItems":orderItems,"shippingInfo":shippingInfo,"itemsPrice":itemsPrice,"taxPrice":taxPrice,"shippingPrice":shippingPrice,"totalPrice":totalPrice,"paymentInfo":paymentInfo})
    .catch(error=>{
        console.log("errror is ",error.response.data.errMessage);
        dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        try {
            if(response.data.success){
                console.log(response.data);
                dispatch(setLoading(false))
                dispatch(setError(null))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }
        
    })
}
export const orderDelivered = (_id) => async (dispatch) => {
    dispatch(setLoading(true))
    
    axios.put(`/api/v1/admin/order/${_id}`,{"orderStatus":'Delivered'})
    .catch(error=>{
        console.log("errror is ",error.response.data.errMessage);
        dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        try {
            if(response.data.success){
                console.log(response.data);
                dispatch(setLoading(false))
                dispatch(setError(null))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }
        
    })
}
export const orderDeleted = (_id) => async (dispatch) => {
    dispatch(setLoading(true))
    
    axios.delete(`/api/v1/admin/order/${_id}`)
    .catch(error=>{
        console.log("errror is ",error.response.data.errMessage);
        dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        try {
            if(response.data.success){
                console.log(response.data);
                dispatch(setLoading(false))
                dispatch(setError(null))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }
        
    })
}