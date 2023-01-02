import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout, updatePass, updateProfile } from '../redux/actions/authenticationActions';
import Header from './layout/Header';

function Password({user}) {
    const dispatch = useDispatch();
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const [password,setpassword] = useState('')
    const [newpass,setnewpass] = useState('')
    const navigate = useNavigate()
    const alert = useAlert()
    if(error!="Login first to access this recourse" && error){
        alert.error(error)}
    var user= user
    
  return (
    <>
      <Header user={user}/>
      <div className='flex justify-center items-center w-full text-left h-screen'>
      
      <div className='container px-36 bg-gray-100 shadow-lg py-10 rounded-lg my-auto block max-w-7xl'>
        <h1 className='text-5xl py-3'>ChangePassword:</h1>
        <div className='flex flex-row'>
          
          <form className='flex flex-col'action='submit' onSubmit={()=>{
            dispatch(updatePass(password,newpass));
            navigate('/login')
            }} >
            <h1 className='text-gray-500 pb-2'>Old Password:</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'password'} value={password} onChange={e=>{setpassword(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>New Password:</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'password'} value={newpass} onChange={e=>{setnewpass(e.target.value)}}/>
            
            <button className='bg-green-500 w-48 rounded p-2' type='submit'>Submit</button>
            </form>
            
          </div>
        </div>
      </div>
        
        
    
    </>
    
  )
}

export default Password