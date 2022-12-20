import React , {useEffect} from 'react'
import { GetSingleProduct } from '../redux/actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loading from './Loading'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'

function ProductInfo() {
    const params = useParams()
    const {product} = useSelector((state) => state.singleProduct)
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const alert = useAlert()
    const dispatch = useDispatch()
        useEffect(() => {
        if(error){
            return alert.error(error)
            }
        console.log(params.productID);
        dispatch(GetSingleProduct(params.productID))
        
        }, [dispatch,error,alert])
  return (
    <div>ProductInfo</div>
  )
}

export default ProductInfo