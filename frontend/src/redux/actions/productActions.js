import axios from 'axios'
import { ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERRORS} from '../../constants/ProductsConstants';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts,setLoading,removeProduct, setError } from '../reducers/productReducer';


export const GetAllProducts = () => async (dispatch) => {
    dispatch(setLoading(true))
    axios.get('api/v1/products')
    .catch(error=>{
        console.log("errror is ",error);
        setError(error)
    })
    .then(function(response){
        if(response.data.success){
            dispatch(fetchProducts(response.data))
            console.log(response.data);
            dispatch(setLoading(false))
        }else{
            console.log(response.data.error.statusCode);
            console.log(response.data.errMessage);
            setError(response.data.error)
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