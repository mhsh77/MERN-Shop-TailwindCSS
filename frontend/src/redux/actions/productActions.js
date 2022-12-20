import axios from 'axios'
import { ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERRORS} from '../../constants/ProductsConstants';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts,setLoading,removeProduct, setError, setValue } from '../reducers/productReducer';


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
    

    // try{
    // axios.get('api/v1/product')
    // .then(function (response) {
    //     console.log(response.data.success);
    //     if(response.data.success){
    //         dispatch(fetchProducts(response.data))
    //         dispatch(setLoading(false))
    //     }else{
    //         console.log(response.data.error.statusCode);
    //         console.log(response.data.errMessage);
    //     }
    // })}
    // catch(error){
    //     console.log("Errrrrrrror is",error);
    // }
}