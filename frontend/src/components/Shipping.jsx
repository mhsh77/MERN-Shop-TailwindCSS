import React, { useState,useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout, updatePass, updateProfile } from '../redux/actions/authenticationActions';
import { addAddress } from '../redux/reducers/ShippingReducer';
import Header from './layout/Header';
import Loading from './Loading';
import { Formik } from 'formik';
import { Radio } from 'flowbite-react';
import { newOrder } from '../redux/actions/orderActions';

function Shipping({user}) {
    const dispatch = useDispatch();
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    var {addresses,prevadd} = useSelector((state)=> state.shipping)
    const [address,setaddress] = useState('');
    const [city,setcity] = useState('');
    const [phoneNo,setphoneNo] = useState('');
    const [zipCode,setzipCode] = useState('');
    const [country,setcountry] = useState('');
    const [showform,setshowform] = useState(false);
    const {cart,totalPrice,totalNum} = useSelector((state)=>state.cart)
    const [Seladdress,setSeladdress] = useState({});
    const navigate = useNavigate()
    const alert = useAlert()
    if(error!=="Login first to access this recourse" && error){
        alert.error(error)}
    var user= user
    useEffect(() => {
      setshowform(!prevadd)
    
      console.log(Seladdress);
    }, [])
    


  return (
    
    <>
      <Header user={user}/>
      <div className='flex-1 text-primary items-center flex'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Shipping Addresses!!
                </h1>

            {showform?<Formik
                    initialValues={{ address: '', city: '',phoneNo:'',postalCode:'',country:'' }}
                    validate={values => {
                        const errors = {};
                        if(!values.address){
                            errors.address = 'Required'
                        }
                        if(!values.city){
                            errors.city = 'Required'
                        }
                        if(!values.phoneNo){
                            errors.phoneNo = 'Required'
                        }
                        if(!values.postalCode){
                            errors.postalCode = 'Required'
                        }
                        if(!values.country){
                            errors.country = 'Required'
                        }
                        return errors
                    }} 
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                        dispatch(addAddress({"address":values.address,"city":values.city,"postalCode":values.postalCode,"phoneNo":values.phoneNo,"country":values.country}))
                        setSubmitting(false);
                        
                        }, 400);
                    }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <h1 className='text-gray-500 pb-2'>Address</h1>
                        <input
                            type="address"
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            className="border-none rounded-lg shadow-md mb-2 px-1 py-2"
                        />
                        <h2 className='text-red-400 font-semibold'>{errors.address && touched.address && errors.address}</h2>
                        <h1 className='text-gray-500 pb-2'>City</h1>
                        <input
                            type="address"
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            className="border-none rounded-lg shadow-md mb-2 px-1 py-2"
                        />
                        <h2 className='text-red-400 font-semibold'>{errors.city && touched.city && errors.city}</h2>
                        <h1 className='text-gray-500 pb-2'>Postal Code</h1>
                        <input
                            type="number"
                            name="postalCode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.postalCode}
                            className="border-none rounded-lg shadow-md mb-2 px-1 py-2"
                        />
                        <h2 className='text-red-400 font-semibold'>{errors.postalCode && touched.postalCode && errors.postalCode}</h2>
                        <h1 className='text-gray-500 pb-2'>country</h1>
                        <input
                            type="text"
                            name="country"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.country}
                            className="border-none rounded-lg shadow-md mb-2 px-1 py-2"
                        />
                        <h2 className='text-red-400 font-semibold'>{errors.country && touched.country && errors.country}</h2>
                        <h1 className='text-gray-500 pb-2'>Phone No</h1>
                        <input
                            type="text"
                            name="phoneNo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phoneNo}
                            className="border-none rounded-lg shadow-md mb-2 px-1 py-2"
                        />
                        <h2 className='text-red-400 font-semibold'>{errors.phoneNo && touched.phoneNo && errors.phoneNo}</h2>
                        
                        <button type="submit" disabled={isSubmitting} className="bg-btn py-1 px-3 rounded-full text-white shadow-md">
                            Creating new address
                        </button>
                        </form>
                        
                    )}
                </Formik>
            :<></>}
          
          
          {prevadd?(
            <>
            <div className='flex flex-col justify-start items-center'>
                <h1>Choose an address</h1>
            {addresses.map((element)=>(
            <label><Radio type="radio" name={element.address} value={element} checked={element===Seladdress} onChange={e=>setSeladdress(element)}/> {element.address} </label>
         
          ))}
          <button className='bg-btn py-1 px-3 rounded-full text-white shadow-md' onClick={()=>setshowform(true)}>Create New Address</button>
          {Seladdress?(<button className='bg-btnsecondary py-1 px-3 rounded-full text-white shadow-md my-2' onClick={()=>{
            setshowform(true)
            console.log(Seladdress.address);
            console.log(cart,Seladdress,totalPrice,0.04,0.4,totalPrice+0.44,{"id":"pi_1qweuiyrewjhgf","status":"success" });
           dispatch(newOrder(cart,Seladdress,totalPrice,0.04,0.4,totalPrice+0.44,{"id":"pi_1qweuiyrewjhgf","status":"success" }))
           navigate('/success')
            }}>Submit Order</button>):(<></>)}
          </div>
          </>
          ):<></>}
            
          
        
            
          </div>
        </div>
      
        
        
    
    </>
    
  )
}

export default Shipping