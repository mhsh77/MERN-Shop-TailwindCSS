import React, { useState,useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout, updatePass, updateProfile } from '../redux/actions/authenticationActions';
import { addAddress } from '../redux/reducers/ShippingReducer';
import Header from './layout/Header';
import Loading from './Loading';
import { Formik } from 'formik';
import { Button, Label, Modal, Radio, TextInput } from 'flowbite-react';
import { newOrder } from '../redux/actions/orderActions';
import axios from 'axios';
import { setLoading, userLogout } from '../redux/reducers/userReducer';
import { setError } from '../redux/reducers/errorAndLoadingReducer';

function Users({user}) {
    const dispatch = useDispatch();
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    var {addresses,prevadd} = useSelector((state)=> state.shipping)
    const [showform,setshowform] = useState(false);
    const {cart,totalPrice,totalNum} = useSelector((state)=>state.cart)
    const [Seladdress,setSeladdress] = useState({});
    const [users,setusers] = useState([]);
    const navigate = useNavigate()
    const alert = useAlert()
    const [delmodal,setdelmodal] = useState(false)
    const [seluser,setseluser] = useState(null)



    const getallusers = async() => {
        await axios.get('/api/v1/admin/users')
        .catch(error=>{
        console.log("errror is ",error.response.data.errMessage);
        console.log(error.response.data.errMessage);
        dispatch(setError(error.response.data.errMessage))
    })
    .then(function(response){
        console.log(response);
        try {
            if(response.data.success){
                console.log(response.data.users);
                setusers(response.data.users)
                dispatch(setLoading(false))
                dispatch(setError(''))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }})
    }




    async function deleteUser (_id) {
        await axios.delete(`/api/v1/admin/user/${_id}`)
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
                getallusers()
                dispatch(setLoading(false))
                dispatch(setError(''))
            }//text this fuct
            
        } catch (error) {
            console.log("hi from error");
            dispatch(setError(error.response.data.errMessage))
        }})
    }



    async function editUser (_id,) {
        console.log(_id);
        console.log(nameinput,emailinput,rolein)
        await axios.put(`/api/v1/admin/user/${_id}`,{"name":nameinput,"email":emailinput,"role":rolein})
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
                getallusers()
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
      getallusers()  
      console.log(Seladdress);
      console.log(users);
    }, [user])
    

    const [deluser,setdeluser] = useState()
    const [eduser,seteduser] =useState()
    const [emailinput,setemailinput]= useState()
    const [nameinput,setnameinput] = useState()
    const [rolein,setrolein] =  useState('user')
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
                    Users!!
                </h1>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                        <div>
                            
                            
                            <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                                    </li>
                                </ul>
                                <div class="py-1">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            users.map(userd=>(
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                
                                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img class="w-10 h-10 rounded-full" src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png" alt="Jese image"/>
                                        <div class="pl-3">
                                            <div class="text-base font-semibold">{userd.name}</div>
                                        </div>  
                                    </th>
                                    <td class="px-6 py-4">
                                    <div class="font-normal text-gray-500">{userd.email}</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                        {userd.role}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button onClick={()=>{
                                            seteduser(true)
                                            setseluser(userd)
                                            setdeluser(true)
                                            setrolein(userd.role)
                                            setnameinput(userd.name)
                                            setemailinput(userd.email)
                                            }} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</button>
                                        
                                        <button onClick={()=>{
                                            setdelmodal(true);
                                            setseluser(userd)
                                            setdeluser(true)
                                            
                                            }} class=" ml-2 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                    </td>
                                    
                                </tr>

                                
                            ))
                           } 
                           {deluser &&
                            <Modal
                                            dismissible={true}
                                            show={delmodal}
                                            onClose={()=>setdelmodal(false)}>
                                            <Modal.Header>
                                                Delete User
                                            </Modal.Header>
                                            <Modal.Body>
                                            <div className="space-y-6">
                                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            {seluser.name}
                                                </p>
                                                
                                            </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button onClick={()=>{
                                                deleteUser(seluser._id)
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
                            }
                            {eduser && 
                            <Modal
                            dismissible={true}
                            show={eduser}
                            onClose={()=>seteduser(false)}>
                            <Modal.Header>
                                Edit User
                            </Modal.Header>
                            <Modal.Body>
                            <div className="space-y-6">
                                <TextInput
                                id="email1"
                                type="email"
                                required={true}
                                defaultValue={seluser.email}
                                value={emailinput}
                                onChange={e=>setemailinput(e.target.value)}
                                />
                                <TextInput
                                id="name"
                                type="text"
                                required={true}
                                defaultValue={seluser.name}
                                value={nameinput}
                                onChange={e=>setnameinput(e.target.value)}
                                />
                                <div className="flex items-center gap-2">
                                    <Radio
                                    id="admin"
                                    name="role"
                                    value="admin"
                                    checked={rolein=="admin"}
                                    onChange={e=>setrolein(e.target.value)}
                                    />
                                    <Label htmlFor="admin">
                                        admin
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio
                                    id="user"
                                    name="role"
                                    value="user"
                                    defaultChecked={true}
                                    checked={rolein=="user"}
                                    onChange={e=>setrolein(e.target.value)}
                                    />
                                    <Label htmlFor="user">
                                        user
                                    </Label>
                                </div>
                            </div>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button onClick={()=>{
                                editUser(seluser._id)
                                seteduser(false)
                                }}>
                                yes
                            </Button>
                            <Button
                                color="gray"
                                onClick={()=>seteduser(false)}
                            >
                                No keep it
                            </Button>
                            </Modal.Footer>
                        </Modal>
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

export default Users