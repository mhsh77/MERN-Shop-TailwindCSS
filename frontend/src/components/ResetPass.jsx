import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { logout, updatePass, updateProfile ,restPassw} from '../redux/actions/authenticationActions';
import Header from './layout/Header';

function ResetPass() {
  const {token} = useParams();
    const dispatch = useDispatch();

    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const [password,setpassword] = useState('')
    const [confpass,setconfpass] = useState('')
    const navigate = useNavigate()
    const alert = useAlert()
    if(error!="Login first to access this recourse" && error){
        alert.error(error)}
    
    
  return (
    <>
      <Header/>
      <div className='flex-1 text-primary items-center flex'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Reset Password
                </h1>
          
          <form className='flex flex-col'action='submit' onSubmit={()=>{
            dispatch(restPassw(password,confpass,token));
            navigate('/login')
            }} >
            <h1 className='text-gray-500 pb-2'>Password:</h1>
            <input className="border-none rounded-lg shadow-md mb-2" type={'password'} value={password} onChange={e=>{setpassword(e.target.value)}}/>
            <h1 className='text-gray-500 pb-2'>Confirm Password:</h1>
            <input className="border-none rounded-lg shadow-md mb-2" type={'password'} value={confpass} onChange={e=>{setconfpass(e.target.value)}}/>
            
            <button className="bg-btn py-1 px-3 rounded-full text-white shadow-md" type='submit'>Submit</button>
            </form>
            
          
        </div>
      </div>
        
        
    
    </>
    
  )
}

export default ResetPass