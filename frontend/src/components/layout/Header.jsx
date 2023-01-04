import React ,{useState} from 'react'
import Search from './Search';
import {Route, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../../redux/reducers/cartReducer';
const Header = ({user,history}) => {
  let Links =[
    {name:"HOME",link:"/"},
    {name:"SERVICE",link:"/"},
    {name:"ABOUT",link:"/"},
    {name:"BLOG'S",link:"/"},
    {name:"CONTACT",link:"/"},
  ];
  let [open,setOpen]=useState(false);
  const {cart,totalPrice,totalNum} = useSelector((state)=>state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const min1 = -1
  const plus1 = 1
  console.log(cart);
    return (
    <>
      <div className="bg-blue-400 shadow-lg">
        <div className='mx-auto flex justify-between items-center container w-full text-white'>

        <button className="my-3 text-3xl font-bold" onClick={()=>navigate('/')}>MH.SHop</button>
        <Search history={history}/>
                 
        <div className="my-auto font-light">
        
          <button onClick={()=>{
            if(user){
              navigate('/me')
            }else{
              navigate('login')
            }
          }}>{user?user.name:'Login'}</button>
          <a className='ml-2' onClick={()=>setOpen(true)}>Card<span className='bg-red-500 py-1 px-2 rounded-md ml-1'>{cart?.length}</span></a>
        </div>



        </div>
      </div>
      <div className={`${open?'block':'hidden'} w-1/3 ml-auto border-l-4 border-indigo-500 h-screen absolute  inset-y-0 right-0 bg-white`}>
        <div className='flex flex-row justify-between p-3'>
          <h1 className='text-2xl'>Cart:</h1>
          <button onClick={()=>setOpen(false)}>X</button>
        </div>
        {cart.map((item)=>{
          if(item.quantity==0){
            dispatch(removeProductFromCart({"product":item,"quantity":plus1}))
          }
         return(
          <div>
              <h1>{item.name}</h1>
              <h2>{item.price*item.quantity}</h2>
              <button className={`bg-red-500 text-white px-2 rounded-md pb-1 mr-3`} onClick={()=>{dispatch(addProductToCart({"product":item,"quantity":min1}))}}>-</button>
              <h2 className=' mr-3'>{item.quantity}</h2>
              <button className={`bg-blue-500 text-white px-2 rounded-md pb-1  mr-5`} onClick={()=>{dispatch(addProductToCart({"product":item,"quantity":plus1}))}}>+</button>

          </div>
          
        )})}
        <div>
          <h1>Total Price:</h1>
          <h2>{totalPrice}</h2>
        </div>
      </div>

      </>  
        
        
        
    
    )
}

export default Header