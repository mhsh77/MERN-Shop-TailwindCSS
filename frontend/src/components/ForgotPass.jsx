import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { forgetPass, logout, updatePass, updateProfile } from '../redux/actions/authenticationActions';
import Header from './layout/Header';

function ForgotPass() {
    const dispatch = useDispatch();
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const [email,setemail] = useState('')
    
    const navigate = useNavigate()
    const alert = useAlert()
    if(error!="Login first to access this recourse" && error){
        alert.error(error)}
    
    
  return (
    <>
      <Header/>
      <div className='flex justify-center items-center w-full text-left h-screen'>
      
      <div className='container px-36 bg-gray-100 shadow-lg py-10 rounded-lg my-auto block max-w-7xl'>
        <h1 className='text-5xl py-3'>ChangePassword:</h1>
        <div className='flex flex-row'>
          
          <form className='flex flex-col'action='submit' onSubmit={()=>{
            dispatch(forgetPass(email))
            navigate('/')
            alert.show('An email containing reset pass url has been send to ur email')
            }} >
            <h1 className='text-gray-500 pb-2'>Email</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'email'} value={email} onChange={e=>{setemail(e.target.value)}}/>
            <button className='bg-green-500 w-48 rounded p-2' type='submit'>Reset Pass</button>
            </form>
            
          </div>
        </div>
      </div>
        
        
    
    </>
    
  )
}

export default ForgotPass