import axios from 'axios'
import { ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERRORS} from '../../constants/ProductsConstants';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts,setLoading,removeProduct } from '../reducers/productReducer';


export const GetAllProducts = () => async (dispatch) => {
    dispatch(setLoading(true))
    axios.get('api/v1/products')
    .then(function (response) {
        console.log(response.data)
        dispatch(fetchProducts(response.data))
    })
}