import React, { useState,useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout, updatePass, updateProfile } from '../redux/actions/authenticationActions';
import { addAddress } from '../redux/reducers/ShippingReducer';
import Header from './layout/Header';
import Loading from './Loading';
import { Formik } from 'formik';
import { Modal, Radio , Button, TextInput } from 'flowbite-react';
import { newOrder } from '../redux/actions/orderActions';
import axios from 'axios';
import { setLoading } from '../redux/reducers/userReducer';
import { setError } from '../redux/reducers/errorAndLoadingReducer';
import { userLogout } from '../redux/reducers/userReducer';
function Products({user}) {
    const dispatch = useDispatch();
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    var {addresses,prevadd} = useSelector((state)=> state.shipping)
    const [showform,setshowform] = useState(false);
    const {cart,totalPrice,totalNum} = useSelector((state)=>state.cart)
    const [Seladdress,setSeladdress] = useState({});
    const [products,setproducts] = useState([]);
    const navigate = useNavigate()
    const alert = useAlert()
    const [namein,setnamein] = useState('')
    const [disin,setdisin] = useState('')
    const [emailinput,setemailinput] = useState('')
    const [rolein,setrolein] = useState('')
    const [pricein,setpricein] = useState('')
    const [stockin,setstockin] = useState('')
    const [edmodal,setedmodal] = useState(false)

    const getallproducts = async() => {
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
                console.log(response.data.products);
                setproducts(response.data.products)
                dispatch(setLoading(false))
                dispatch(setError(''))

            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }})
    }
    if(error!=="Login first to access this recourse" && error){
        alert.error(error)}
    var user= user
    useEffect(() => {
      setshowform(!prevadd)
      getallproducts()  
      console.log(Seladdress);
    }, [])
    
    async function deleteProduct (id) {
        await axios.delete(`/api/v1/admin/product/delete/${id}`)
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
                dispatch(setError(''))
                dispatch(setLoading(false))
                dispatch(setError(''))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }})
    }

    async function editProduct (_id,) {
        console.log(_id);
    
        await axios.put(`/api/v1/admin/product/update/${_id}`,{"name":namein,"discription":disin,"email":emailinput,"role":rolein,"price":pricein,"stock":stockin})
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
                getallproducts()
                dispatch(setLoading(false))
                dispatch(setError(''))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }})
    }


    const [delmodal,setdelmodal] = useState(false)
    const [manid,setmanid] = useState('')
  return (
    
    <>
      <Header user={user}/>
      <div className='flex flex-1 flex-row'>
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
            <div className='w-full max-w-5xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Products!!
                </h1>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Stock
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            products.map(product=>(
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                
                                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img class="w-10 h-10 rounded-full" src="data:image/jpeg;base64,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wuc2WUyWc0m4cL2sFgxjB872w85JJjm4AjjRxhoa0vcDo4273r5lhOLK61uH5LZuDjzfSy3UPLI57i97i5xNy4kkk85J3qAWoiopAVVREAREQFVREQBEWWCB8jxHG0vc42a0byUBiRdI2bgKnbGOHLnyEcbK6zQeZumo6T7l6/kNRcz/AGn/AGUXByxVXU/kNReK/wBoVX5D0Xiv9oUuDlSLqvyHofEf7QqvyIofEf7VyXBylVXVhgmh/Vu9q/8ANV+RVD+qd7V/5pcHKFsWBdmOnq2yWOSI53HkzW4jeu+voW7twZQD+5J65ZPiUxSUscLBHExrGjcGiw//AFGwehERVByLG9MY66W+5xDx0gtH8QR6FArsWIsPxVrAHHI9vevAvboI5QtGqcCVjDxAyQc7XgesOsrJg106NCxLZajCFbyQ36nx/EvKcJVw/wAO76TPiU3BCIpd2F60f4d3rb+aoMMVp/w7vW380uCJRTTcJVx/w5+lH8SvGDq/yc+0j+JLggUWwjBdf+p/1I/iVRgmu/VAdcjP4FLgh9nUElTK2GJt3O9QHK5x5AFvlP2PYA0cJPI53KWhjR6AQT71MYY2Ayhito6R1jI/nPit/ZH/AHU4qtg013Y9p+SaT05D9zQtNxHsU0UvBl2YEBwIFrg3G7k1B0XZFpWN8PT1UrZYW57MDC3M0EWc434xAtxvciYOdItg+Rtf+o/1I/iT5F1/6j/Uj+JWuCChic9wYxpc5xs0AXJJ5Aup4Sw02jZwklnTOHGO8MHiN/ieVWYSww2jbwktnTEbxqGDxW9POf6OzqrYCIigBERAEREAREQBERAEREAREQBERAWlgQMCuRAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf/Z" alt="Jese image"/>
                                        <div class="pl-3">
                                            <div class="text-base font-semibold">{product.name}</div>
                                        </div>  
                                    </th>
                                    <td class="px-6 py-4">
                                    <div class="font-normal text-gray-500">{product.price}</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                        {product.stock}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button onClick={()=>{
                                            setedmodal(true)
                                            setmanid(product._id)
                                            setnamein(product.name)
                                            setpricein(product.price)
                                            setstockin(product.stock)
                                            setdisin(product.discription)
                                        }}  class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</button>
                                        <Modal
                                            dismissible={true}
                                            show={delmodal}
                                            onClose={()=>{
                                                setdelmodal(false)
                                                
                                            }}
                                            
                                        >




                                            
                                        <Modal.Header>
                                            Delete Product
                                            </Modal.Header>
                                            <Modal.Body>
                                            <div className="space-y-6">
                                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                               Are you sure you want to delete this product
                                                </p>
                                                
                                            </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button onClick={()=>{
                                                deleteProduct(product._id)
                                                setdelmodal(false)
                                                }}>
                                                yes
                                            </Button>
                                            <Button
                                                color="gray"
                                                onClick={()=>setdelmodal(false)}
                                            >
                                                No keep it
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>




                                        <Modal
                                            dismissible={true}
                                            show={edmodal}
                                            onClose={()=>setedmodal(false)}
                                        >
                                        <Modal.Header>
                                            Edit Product
                                            </Modal.Header>
                                            <Modal.Body>
                                            <div className="space-y-6">
                                                <TextInput
                                                id="name"
                                                type="text"
                                                required={true}
                                                defaultValue={namein}
                                                value={namein}
                                                onChange={e=>setnamein(e.target.value)}
                                                />
                                                <TextInput
                                                id="price"
                                                type="number"
                                                required={true}
                                                defaultValue={pricein}
                                                value={pricein}
                                                onChange={e=>setpricein(e.target.value)}
                                                />
                                                <TextInput
                                                id="stock"
                                                type="number"
                                                required={true}
                                                defaultValue={stockin}
                                                value={stockin}
                                                onChange={e=>setstockin(e.target.value)}
                                                />
                                                
                                            </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button onClick={()=>{
                                                editProduct(manid)
                                                setedmodal(false)
                                                }}>
                                                yes
                                            </Button>
                                            <Button
                                                color="gray"
                                                onClick={()=>setedmodal(false)}
                                            >
                                                No keep it
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <button onClick={()=>{setdelmodal(true)}} class=" ml-2 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                           } 
                            
                            
                            
                        </tbody>
                    </table>
                </div>
          
            
          
        
            
          </div>
        </div>
      </div>
        
      
        
        
    
    </>
    
  )
}

export default Products