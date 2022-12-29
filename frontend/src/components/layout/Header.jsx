import React ,{useState} from 'react'
import Search from './Search';
import {Route} from 'react-router-dom'
const Header = ({history}) => {
  let Links =[
    {name:"HOME",link:"/"},
    {name:"SERVICE",link:"/"},
    {name:"ABOUT",link:"/"},
    {name:"BLOG'S",link:"/"},
    {name:"CONTACT",link:"/"},
  ];
  let [open,setOpen]=useState(false);
    return (
      <div className="bg-blue-400 shadow-lg">
        <div className='mx-auto flex justify-between items-center container w-full text-white'>

        <div className="my-3 text-3xl font-bold">MH.SHop</div>
        <Search history={history}/>
                 
        <div className="my-auto font-light">
          <a href="">Login</a>
          <a href="" className='ml-2' >Card<span className='bg-red-500 py-1 px-2 rounded-md ml-1'>0</span></a>
        </div>



        </div>
      </div>
      
        
        
        
    
    )
}

export default Header