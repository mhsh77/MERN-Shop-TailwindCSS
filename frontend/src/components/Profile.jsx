import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout, updateProfile } from '../redux/actions/authenticationActions';
import Header from './layout/Header';

function Profile({user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const [username,setusername] = useState(user.name)
    const [email,setemail] = useState(user.email)
    const [passwrd,setpasswrd] = useState('samplePassword')
    const alert = useAlert()
    if(error!="Login first to access this recourse" && error){
        alert.error(error)}
    var user= user
  return (
    <>
      <Header user={user}/>
      <div className='flex justify-center items-center w-full text-left h-screen'>
      
      <div className='container px-36 bg-gray-100 shadow-lg py-10 rounded-lg my-auto block max-w-7xl'>
        <h1 className='text-5xl py-3'>Profile</h1>
        <div className='flex flex-row'>
          <div className='w-1/2 '>
            <img src="https://lh3.googleusercontent.com/a/AEdFTp4nWiQTCHtY4Pqt3R2gzWbnaC1Cw--jL98A7SbVQw=s432-p-rw-no" alt=""  className='rounded-full w-72 block p-1 mx-auto mb-3'/>
            <button className='bg-blue-300 text-white rounded-full block p-3 mx-auto' onClick={()=>dispatch(updateProfile({name:username,email}))}>edit Profile</button>
          </div>
          <div className='flex w-1/2 flex-col'>
            <h1 className='text-gray-500 pb-2'>Name:</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'text'} value={username} onChange={e=>{setusername(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>Email:</h1>
            <input className='bg-blue-300 rounded p-2 mb-10' type={'text'} value={email} onChange={e=>{setemail(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>Registeration Date:</h1>
            <h2 className='bg-blue-300 rounded p-2 mb-10'>{user.createdAt}</h2> 
            <div className='flex flex-row justify-between text-white pt-2'>
            <button className='bg-green-500 w-48 rounded p-2' onClick={()=>navigate('/newpass')}>Change Password</button>
            <button className='bg-red-500 w-48  rounded p-2' onClick={()=>dispatch(logout())}>Logout</button>
            </div>
            
          </div>
        </div>
      </div>
        
        
    </div>
    </>
    
  )
}

export default Profile