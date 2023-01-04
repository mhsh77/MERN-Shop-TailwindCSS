import React , {useEffect, useState} from 'react'
import { GetSingleProduct } from '../redux/actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from './layout/MetaData'
import Product, { Rating } from './product/Product'
import Loading from './Loading'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import { Carousel } from 'flowbite-react'
import Header from './layout/Header'
import { login } from '../redux/actions/authenticationActions'

import { addProductToCart } from '../redux/reducers/cartReducer'
function ProductInfo({user,history}) {
    const params = useParams()
    const {product} = useSelector((state) => state.singleProduct)
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const alert = useAlert()
    
    const dispatch = useDispatch()
    const [quantity,setquantity] = useState(1)
        useEffect(() => {
          if(error!="Login first to access this recourse" && error){
            alert.error(error)
        }
        console.log(params.productID);
        dispatch(GetSingleProduct(params.productID))
        }, [dispatch,error,alert])
  return (
    <>
    <Header history={history} user={user}/>
    <MetaData title={product.name}/>
    {isLoading ? <Loading />:(
    
    <div className='container grid grid-cols-2 mx-auto min-h-screen'>
      
      <div className='mt-3 px-10'>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
  <Carousel slide={false}>
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
      alt="..."
    />
  </Carousel>
</div>

      </div>
      
      <div className='text-left'>
        <h1 className='text-3xl'>{product.name}</h1>
        <h2 className='text-gray-300'>{product._id}</h2>
        <span className='border-y-2 border-gray-300 text-gray-500 py-3 flex flex-row items-center'>{<Rating rating={product.rating}/>} ({product.rating})</span>
        <h1 className="text-3xl font-bold py-3">${product.price}</h1>
        <div className='flex justify-start items-center py-3'>
          <button className={`${quantity===0?'bg-red-200':'bg-red-500'} text-white px-2 rounded-md pb-1 mr-3`} onClick={()=>{setquantity(quantity-1);}} disabled={quantity===0?true:false}>-</button>
          <h2 className=' mr-3'>{quantity}</h2>
          <button className={`${quantity===product.stock?'bg-blue-200':'bg-blue-500'} text-white px-2 rounded-md pb-1  mr-5`} onClick={()=>(setquantity(quantity+1))} disabled={quantity===product.stock?true:false}>+</button>
          <button className='bg-yellow-300 text-white font-light px-5 py-1 rounded-full' onClick={()=>{dispatch(addProductToCart({product,quantity}));setquantity(1)}}>Add to Card</button>
        </div>
        <h1 className=' border-y-2 border-gray-300 my-3 py-3'>Status: {product.stock > 0 ? "In Stock":"Out of stock"}</h1>
        <h1 className='text-3xl'>Description:</h1>
        <p className='text-sm'>{product.discription}</p>
        <button className='bg-yellow-300 text-white font-light px-5 py-1 my-5 rounded-full'>Add Review</button>
      </div>
        
      
    </div>)}
    </>
    
  )
}

export default ProductInfo