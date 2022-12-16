import React ,{Fragment, useEffect} from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { GetAllProducts } from '../redux/actions/productActions'
import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loading from './Loading'
function Home() {
  
  
  const {isLoading,products,productsCount,error} = useSelector((state) => state.product)
  
  const dispatch = useDispatch()
    useEffect(() => {
      dispatch(GetAllProducts())
      
    }, [dispatch])
  
    
  
  return (
    <>
    {isLoading ? <Loading/>:(
    <div className="container w-full mx-auto">
      <MetaData title={"Home"}/>
      <div className='mt-10'>
        <h1 className='text-3xl'>Latest products</h1>
        <div className='flex flex-row m-3'>
        
        {products && products?.map(product => (
          <Product product={product}/>
        ))} 
        </div>  
      </div>
    </div>)}
    </>
    
  )
}

export default Home