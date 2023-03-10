import React ,{Fragment, useEffect, useState} from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { GetAllProducts } from '../redux/actions/productActions'
import MetaData from './layout/MetaData'
import Product, { Rating } from './product/Product'
import Loading from './Loading'
import { useAlert } from 'react-alert'
import Pagination from "react-js-pagination";
import { useNavigate, useParams } from 'react-router-dom'
import Header from './layout/Header'
import Slider  from 'rc-slider';
import 'rc-slider/assets/index.css';
import { setUser } from '../redux/reducers/userReducer'
import { me } from '../redux/actions/authenticationActions'
const createSliderWithTooltip = Slider.createSliderWithTooltip;


function Home({user}) {
  const navigate = useNavigate();
  const keyword = useParams().keyword
  const [rating,setrating] = useState(0)
  //const {user} = useSelector((state)=>state.authentication)
 // console.log(keyword);
  const [currentPage,setcurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const resPerPage = 4;
  const {products,productsCount} = useSelector((state) => state.products)
  const {isLoading,error} = useSelector((state) => state.errorAndLoading)
  const alert = useAlert()
  const dispatch = useDispatch()
  
  var cate = [
    'Electronics',
    'Cameras',
    'Laptop',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauity/Health',
    'Sports',
    'Outdoor',
    'Home'
]
  const [cat,setcat] = useState('')
    useEffect(() => {
      if(error!="Login first to access this recourse" && error){
        alert.error(error)
      }
        //dispatch(me())
      //dispatch(setUser(localStorage.getItem('user')))
      dispatch(GetAllProducts(currentPage,keyword,price,cat,rating))
      
      
    }, [dispatch,error,alert,currentPage,keyword,price,cat,rating])
  
    const handlePageChange=(pageNum)=>{
      setcurrentPage(pageNum)
    }
  
  return (
    <>
    <Header user={user} />
    {keyword ?(
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='container flex flex-row justify-between items-center px-96'>
        <h1 className='px-5'>price:</h1>
        <div className='flex flex-row items-center my-10'>
          <h2 className='px-5 text-gray-500 text-sm w-48'>from:${price[0]} to ${price[1]}</h2>
          <div className='w-96'>
            <Slider
              range
              marks={{
              1: `$1`,
              1000: `$1000`
              }}
              min={1}
              max={1000}
              defaultValue={[1, 1000]}
              tipFormatter={value => `$${value}`}
              tipProps={{
              placement: "top",
              visible: true
              }}
              value={price}
              onChange={price => setPrice(price)}
            />
        </div>
        
      </div>
      
      
      
      </div>
      <div>
        <h1>Category</h1>
        <div className='flex flex-row'>
          {cate.map((item)=>(
            <h1 className={`px-3 py-5${item == cat? 'text-blue-700 text-lg font-bold':'text-blue-300'}`} onClick={()=>setcat(item)}>{item}</h1>
          ))}
        </div>
        
      </div>
      <div>
          <h1>Rating:</h1>
          {[5,4,3,2,1].map((item)=>
          
            <button className='block m-3' onClick={()=>setrating(item)}>
              <div className='flex flex-row'>
              <Rating rating={item}/>
              </div>
            </button>
            
          
          
          )}
        </div>
    </div>):(
    <>
    </>) }
    
    
    
    {isLoading ? <Loading/>:(
      <>
    <div className="container w-full mx-auto">
      <MetaData title={"Home"}/>
      <div className='mt-10'>
        <h1 className='text-3xl'>Latest products</h1>
        <div className='flex flex-row m-3 overflow-scroll scrollbar-hide'>
        
        {products && products?.map(product => (
          <Product product={product}/>
        ))} 
        </div>  
      </div>
    </div>
    <div className=' flex flex-col'>
      
    <Pagination
          activePage={currentPage}
          itemsCountPerPage={4}
          totalItemsCount={productsCount}
          onChange={handlePageChange}
          nextPageText = {'Next'}
          prevPageText = {'Perv'}
          firstPageText = {'First'}
          lastPageText = {'Last'}
          innerClass={'flex justify-center'}
          itemClass={'p-3 text-blue-300'}
          activeLinkClass = {' text-lg font-bold text-blue-600'}
          className=""
          
      />
  </div>
  </>
  )}
    
    
    </>
    
  )
}

export default Home