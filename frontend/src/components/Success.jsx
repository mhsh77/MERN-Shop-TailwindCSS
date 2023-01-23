import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout, updatePass, updateProfile } from '../redux/actions/authenticationActions';
import Header from './layout/Header';

function Success({user}) {
    const dispatch = useDispatch();
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const [password,setpassword] = useState('')
    const [newpass,setnewpass] = useState('')
    const navigate = useNavigate()
    const alert = useAlert()
    if(error!="Login first to access this recourse" && error){
        alert.error(error)}
    var user= user
    setTimeout(() => {
      navigate('/')
    }, 5000);
  return (
    <>
      <Header user={user}/>
      <div className='flex-1 text-primary items-center flex'>
        <div className='w-full max-w-md md:max-w-2xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
          <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>Order submited successfully</h1>
          
            
          </div>
        </div>
      
        
        
    
    </>
    
  )
}

export default Success