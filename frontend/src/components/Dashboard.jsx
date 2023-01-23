import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import { HiChartPie,HiViewBoards,HiUser,HiShoppingBag,HiArrowSmRight,HiTable } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setError, setLoading } from '../redux/reducers/errorAndLoadingReducer';
import { userLogout } from '../redux/reducers/userReducer';

function Dashboard({user}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [orders,setorders] = useState(0)
  const [users,setusers] = useState([])
  const [products,setproducts] = useState(0)
  async function getallOrders () {
    await axios.get(`/api/v1/admin/orders`)
    .catch(error=>{
    console.log("errror is ",error.response.data.errMessage);
    console.log(error.response.data.errMessage);
    dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        console.log(response);
        try {
            if(response.data.success){
                console.log(response.data);
                setorders(response.data.totalAmunt)
                dispatch(setLoading(false))
                dispatch(setError(''))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }})
  }
  const getallprodcts = async() => {
    await axios.get('/api/v1/products')
    .catch(error=>{
    console.log("errror is ",error.response.data.errMessage);
    console.log(error.response.data.errMessage);
    dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        console.log(response);
        try {
            if(response.data.success){
                console.log(response.data.users);
                setproducts(response.data.productCount)
                dispatch(setLoading(false))
                dispatch(setError(''))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }})
  }
  const getallusers = async() => {
    await axios.get('/api/v1/admin/users')
    .catch(error=>{
    console.log("errror is ",error.response.data.errMessage);
    console.log(error.response.data.errMessage);
    dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        console.log(response);
        try {
            if(response.data.success){
                console.log(response.data.totalusers);
                setusers(response.data.totalusers)
                dispatch(setLoading(false))
                dispatch(setError(''))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }})
  }
  useEffect(() => {
    
    getallOrders()
    getallprodcts()
    getallusers()
    dispatch(setError(null))
    
  }, [])
  
  return (
          <>
            <Header user={user}/>
              <div className='flex flex-1'>
                
              <div className="w-fit h-full bg-transparent border-r-2">
                  <aside class="md:w-64 w-16 flex-1" aria-label="Sidebar">
                    <div class="px-3 py-4 overflow-y-auto overflow-hidden rounded bg-transparent-50 dark:bg-gray-800">
                        <ul class="space-y-2">
                          <li>
                              <button onClick={()=>navigate('/dashboard')} class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                                <svg aria-hidden="true"  class="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400  "  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                <span class="ml-3 md:block hidden">Dashboard</span>
                              </button>
                          </li>
                          
                          
                          <li>
                              <button onClick={()=>navigate('/admin/users')} class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black">
                                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400  "  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                <span class="flex-1 ml-3 whitespace-nowrap md:block hidden">Users</span>
                              </button>
                          </li>
                          <li>
                              <button onClick={()=>navigate('/admin/products')} class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black">
                                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400  "  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                                <span class="flex-1 ml-3 whitespace-nowrap md:block hidden">Products</span>
                              </button>
                          </li>
                          
                          <li>
                              <button onClick={()=>navigate('/admin/orders')} class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
  <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
  <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
</svg>

                                <span class="flex-1 ml-3 whitespace-nowrap md:block hidden">Orders</span>
                              </button>
                          </li>
                          <li>
                              <button onClick={()=>dispatch(userLogout())} class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black">
                                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                                <span class="flex-1 ml-3 whitespace-nowrap md:block hidden">Sign Out</span>
                              </button>
                          </li>
                        </ul>
                    </div>
                  </aside>
                </div>
                <div className='flex-1 text-primary items-center flex'>
                    
                    <div className='w-full max-w-3xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                        <div className='text-2xl font-medium  mt-4 mb-12 text-center flex justify-center flex-col'>
                            <h1 className='block border-b-2 mb-3 shadow-md'>Dashboard</h1>
                            <div className='grid md:grid-cols-2  grid-cols-1 gap-4 mx-auto'>
                              <div className='transition ease-in-out delay-150 bg-red-300 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300 flex flex-col justify-center items-center rounded-xl shadow-lg md:w-64 md:h-64 w-48 h-48 md:hover:w-72 md:hover:h-72'>
                                <h1 >Out of Stocks:</h1>
                                <h1>123</h1>
                              </div>
                              <div onClick={()=>navigate('/admin/orders')} className='transition ease-in-out delay-150 bg-green-300 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300 flex flex-col justify-center items-center rounded-xl shadow-lg md:w-64 md:h-64 w-48 h-48 md:hover:w-72 md:hover:h-72'>
                                <h1 className=''>Orders:</h1>
                                <h1>${orders.toFixed(0)}</h1>
                              </div>
                              
                              <div onClick={()=>navigate('/admin/products')} className='transition ease-in-out delay-150 bg-blue-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 flex flex-col justify-center items-center rounded-xl shadow-lg md:w-64 md:h-64 w-48 h-48 md:hover:w-72 md:hover:h-72'>
                                <h1 className=''>Products:</h1>
                                <h1>{products}</h1>
                              </div>
                              <div onClick={()=>navigate('/admin/users')} className='transition ease-in-out delay-150 bg-gray-300 hover:-translate-y-1 hover:scale-110 hover:bg-gray-500 duration-300 flex flex-col justify-center items-center rounded-xl shadow-lg md:w-64 md:h-64 w-48 h-48 md:hover:w-72 md:hover:h-72'>
                                <h1 className=''>Users:</h1>
                                <h1>{users}</h1>
                              </div>
                              
                            
                            </div>
                           
                        </div>
                    </div>
                </div>
              </div>
              
              
          </>
      
  )
}

export default Dashboard