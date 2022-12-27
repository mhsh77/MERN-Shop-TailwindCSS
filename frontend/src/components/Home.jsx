import React ,{Fragment, useEffect, useState} from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { GetAllProducts } from '../redux/actions/productActions'
import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loading from './Loading'
import { useAlert } from 'react-alert'
import Pagination from "react-js-pagination";
function Home() {
  
  const [currentPage,setcurrentPage] = useState(1)
  const resPerPage = 4;
  const {products,productsCount} = useSelector((state) => state.products)
  const {isLoading,error} = useSelector((state) => state.errorAndLoading)
  const alert = useAlert()
  const dispatch = useDispatch()
    useEffect(() => {
      if(error){
        return alert.error(error)
        }
      dispatch(GetAllProducts(currentPage))
      console.log(isLoading,products,productsCount,error);
      
    }, [dispatch,error,alert,currentPage])
  
    const handlePageChange=(pageNum)=>{
      setcurrentPage(pageNum)
    }
  
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
    <div className=' flex flex-col'>
      {}
      <Pagination
            activePage={currentPage}
            itemsCountPerPage={2}
            totalItemsCount={productsCount}
            onChange={handlePageChange}
            nextPageText = {'Next'}
            prevPageText = {'Perv'}
            firstPageText = {'First'}
            lastPageText = {'Last'}
            innerClass={'flex justify-center'}
            itemClass={'p-3 text-blue-300'}
            activeLinkClass = {' text-lg font-bold text-blue-600'}
        />
    </div>
    
    </>
    
  )
}

export default Home