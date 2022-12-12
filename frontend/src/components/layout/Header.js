import React ,{useState} from 'react'
const Header = () => {
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
        <div className='mx-auto flex justify-between container w-full text-white'>

        <div className="my-3 text-3xl font-bold">MH.SHop</div>
          <div className='relative block my-auto w-full mx-10 opacity-75'>
          <input type="text" placeholder='Search product...' className='w-full rounded-lg py-1 pl-2 font-med'/>
          <button>
            <img src="https://cdn-icons-png.flaticon.com/512/49/49116.png" height={20} width={20} alt="" className='absolute top-1/2 -translate-y-1/2 right-2 '/>
            </button>
          </div>
                 
        <div className="my-auto font-light">
          <a href="">Login</a>
          <a href="" className='ml-2' >Card<span className='bg-red-500 py-1 px-2 rounded-md ml-1'>0</span></a>
        </div>



        </div>
      </div>
      
        
        
        
    
    )
}

export default Header