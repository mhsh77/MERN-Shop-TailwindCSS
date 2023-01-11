import React, { useState,useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { forgetPass, logout, updatePass, updateProfile } from '../redux/actions/authenticationActions';
import Header from './layout/Header';
import Loading from './Loading';

function ForgotPass() {
    const dispatch = useDispatch();
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const [email,setemail] = useState('')
    
    const navigate = useNavigate()
    const alert = useAlert()
    useEffect(() => {
      
      if(error!="Login first to access this recourse" && error){
        alert.error(error)}
      
    }, [error])
    
    
    
    
  return (
    <>
      <Header/>
        {isLoading ? <Loading/>:(
        <div className='flex-1 text-primary items-center flex'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>
          <form className='flex flex-col'action='submit' onSubmit={()=>{
            dispatch(forgetPass(email))
            navigate('/')
            alert.show('An email containing reset pass url has been send to ur email')
            }} >
            <h1 className='text-gray-500 pb-2'>Email</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'email'} value={email} onChange={e=>{setemail(e.target.value)}}/>
            <button className="bg-btn py-1 px-3 rounded-full text-white shadow-md" type='submit'>Reset Pass</button>
            </form>
            
          
            </div>
        </div>)}
    
    </>
    
  )
}

export default ForgotPass