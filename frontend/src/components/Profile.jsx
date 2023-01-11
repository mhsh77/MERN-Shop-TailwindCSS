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
      <div className='flex-1 text-primary items-center flex'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>
        <div className='flex flex-col'>
          <div className=''>
            <img src="https://lh3.googleusercontent.com/a/AEdFTp4nWiQTCHtY4Pqt3R2gzWbnaC1Cw--jL98A7SbVQw=s432-p-rw-no" alt=""  className='rounded-full w-48 block p-1 mx-auto mb-3'/>
            <button className='bg-btn py-1 px-3 rounded-full text-white shadow-md mx-auto block' onClick={()=>dispatch(updateProfile({name:username,email}))}>edit Profile</button>
          </div>
          <div className='flex flex-col'>
            <h1 className='text-gray-500 pb-2'>Name:</h1>
            <input className="border-none rounded-lg shadow-md mb-2" type={'text'} value={username} onChange={e=>{setusername(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>Email:</h1>
            <input className="border-none rounded-lg shadow-md mb-2" type={'text'} value={email} onChange={e=>{setemail(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>Registeration Date:</h1>
            <h2 className='bg-blue-300 rounded p-2 mb-10'>{user.createdAt}</h2> 
            <div className='flex flex-row justify-between text-white pt-2 items-center'>
            <button className='bg-btn py-1 px-3 rounded-full text-white shadow-md' onClick={()=>navigate('/newpass')}>Change Password</button>
            <button className='bg-btnsecondary py-1 px-3 rounded-full text-white shadow-md' onClick={()=>dispatch(logout())}>Logout</button>
            </div>
            
          </div>
        </div>
      </div>
        
        
    </div>
    </>
    
  )
}

export default Profile