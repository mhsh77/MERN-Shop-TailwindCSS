import axios from 'axios'
import { ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERRORS} from '../../constants/ProductsConstants';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts,removeProduct, setValue } from '../reducers/productsReducer';
import { setError,setLoading } from '../reducers/errorAndLoadingReducer';
import { fetchProduct } from '../reducers/signleProductReducer';
import { fetchorders } from '../reducers/orderReducer';
export const GetAllProducts = (currentPage=1,keyword='',price,cat,rating=0) => async (dispatch) => {
    dispatch(setLoading(true))
    if(cat==''){
        axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`)
        .catch(error=>{
            console.log("errror is ",error.response.data.errMessage);
            dispatch(setError(error.response.data.errMessage))
            
            
        })
        .then(function(response){
            try {
                if(response.data.success){
                    dispatch(fetchProducts(response.data))
                    
                    console.log(response.data);
                    dispatch(setLoading(false))
                    dispatch(setError(null))
                }
                
            } catch (error) {
                console.log("hi from error");
                dispatch(setError(error.response.data.errMessage))
            }
            
        })
    }else{
        axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${cat}&rating[gte]=${rating}`)
        .catch(error=>{
            console.log("errror is ",error.response.data.errMessage);
            dispatch(setError(error.response.data.errMessage))
            
            
        })
        .then(function(response){
            try {
                if(response.data.success){
                    dispatch(fetchProducts(response.data))
                    
                    console.log(response.data);
                    dispatch(setLoading(false))
                }
                
            } catch (error) {
                console.log("hi from error");
                dispatch(setError(error.response.data.errMessage))
            }
            
        })
    }
    
    
}
export const GetSingleProduct = (productID) => async (dispatch) => {
    dispatch(setLoading(true))
    axios.get(`/api/v1/product/${productID}`)
    .catch(error=>{
        console.log("errror is ",error.response.data.errMessage);
        dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        try {
            if(response.data.success){
                dispatch(fetchProduct(response.data.product))
                
                console.log(response.data);
                dispatch(setLoading(false))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }
        
    })
}

export const CreateReview = (productID,rating,comment) => async (dispatch) => {
    dispatch(setLoading(true))
    axios.put(`/api/v1/review`,{"productId":productID,"rating":rating,"comment":comment})
    .catch(error=>{
        console.log("errror is ",error.response.data.errMessage);
        dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        try {
            if(response.data.success){
                console.log(response.data);
                dispatch(setLoading(false))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }
        
    })
}
export const GetOrderes = () => async (dispatch) => {
    dispatch(setLoading(false))
    axios.get('/api/v1/orders/me')
    .catch(error=>{
        console.log("errror is ",error.response.data.errMessage);
        dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        try {
            if(response.data.success){
                dispatch(fetchorders(response.data))
                console.log(response.data);
                dispatch(setLoading(false))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }
        
    })
}