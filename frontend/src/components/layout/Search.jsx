import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Search({history}) {
    const [keyword,setkeyword] = useState('')
    const navigate = useNavigate();
    const searchHandler = (e) => {
        e.preverntDefault()
        navigate(`/search/${keyword}`)
    }
  return (
    <form onSubmit={searchHandler}>
        <div className='relative block my-auto w-full mx-10 opacity-75'>
            <input type="text" placeholder='Search product...' className='w-full rounded-lg py-1 pl-2 font-med text-black' onChange={(e)=> setkeyword(e.target.value)}/>
            <button onClick={()=>navigate(`/search/${keyword}`)}>
                <img src="https://cdn-icons-png.flaticon.com/512/49/49116.png" height={20} width={20} alt="" className='absolute top-1/2 -translate-y-1/2 right-2 '/>
            </button>
        </div>
    </form>
    
  )
}

export default Search