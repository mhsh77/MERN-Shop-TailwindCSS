import React, { useState,useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout, updatePass, updateProfile } from '../redux/actions/authenticationActions';
import { addAddress } from '../redux/reducers/ShippingReducer';
import Header from './layout/Header';

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
    
    const [Seladdress,setSeladdress] = useState('');
    const navigate = useNavigate()
    const alert = useAlert()
    if(error!=="Login first to access this recourse" && error){
        alert.error(error)}
    var user= user
    useEffect(() => {
      setshowform(!prevadd)
    
      
    }, [])
    


  return (
    
    <>
      <Header user={user}/>
      <div className='flex justify-center items-center w-full text-left h-screen'>
      
      <div className='container px-36 bg-gray-100 shadow-lg py-10 rounded-lg my-auto block max-w-7xl'>
        <h1 className='text-5xl py-3'>Shipping Info:</h1>
        <button className='bg-green-500 w-48 rounded p-2' onClick={()=>setshowform(true)}>Create New Address</button>
        <div className='flex flex-row'>
            {showform?<form className='flex flex-col'action='submit' onSubmit={()=>{
            dispatch(addAddress({address,city,zipCode,phoneNo,country}));
            navigate('/')
            }} >
            <h1 className='text-gray-500 pb-2'>Address:</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'text'} value={address} onChange={e=>{setaddress(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>City:</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'text'} value={city} onChange={e=>{setcity(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>Phone No:</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'text'} value={phoneNo} onChange={e=>{setphoneNo(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>Postal Code:</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'text'} value={zipCode} onChange={e=>{setzipCode(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>Country:</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'text'} value={country} onChange={e=>{setcountry(e.target.value)}}/>
            
            <button className='bg-green-500 w-48 rounded p-2' type='submit'>Submit</button>
            </form>
            :<></>}
          
          <div className='bg-red-500'>
          {addresses.map((element)=>(
            <label><input type="radio" name={element.address} value={element} checked={element===Seladdress} onChange={e=>setSeladdress(e.target.value)}/> {element.address} </label>
         
          ))}
            <button className='bg-green-500 w-48 rounded p-2' onClick={()=>setshowform(true)}>Create New Address</button>
          </div>
          
          <button className='bg-green-500 w-48 rounded p-2' onClick={()=>console.log(Seladdress)}>Submit Order</button>
            
          </div>
        </div>
      </div>
        
        
    
    </>
    
  )
}

export default Shipping