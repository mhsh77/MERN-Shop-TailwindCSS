import axios from 'axios'
import { ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERRORS} from '../../constants/ProductsConstants';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts,removeProduct, setValue } from '../reducers/productsReducer';
import { setError,setLoading } from '../reducers/errorAndLoadingReducer';
import { fetchProduct } from '../reducers/signleProductReducer';
export const GetAllProducts = () => async (dispatch) => {
    dispatch(setLoading(true))
    axios.get('api/v1/products')
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
                dispatch(fetchProduct(response.data))
                
                console.log(response.data);
                dispatch(setLoading(false))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }
        
    })
}