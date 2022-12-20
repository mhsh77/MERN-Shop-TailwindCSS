import React ,{Fragment, useEffect} from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { GetAllProducts } from '../redux/actions/productActions'
import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loading from './Loading'
import { useAlert } from 'react-alert'
function Home() {
  
  
  const {isLoading,products,productsCount,error} = useSelector((state) => state.product)
  const alert = useAlert()
  const dispatch = useDispatch()
    useEffect(() => {
      if(error){
        return alert.error(error)
        }
      dispatch(GetAllProducts())
      console.log(isLoading,products,productsCount,error);
      
    }, [dispatch,error,alert])
  
    
  
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
    <button onClick={()=>console.log(error)}>hi</button>
    </>
    
  )
}

export default Home