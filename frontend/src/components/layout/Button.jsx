import React ,{useState} from 'react'

function Button() {
  const array = ['a','b','c']
  const [address,setaddress] = useState('')
  return (
    <div>
      {array.map((element)=>(
         <label>{element} <input type="radio" name={element} value={element} checked={element===address} onChange={e=>setaddress(e.target.value)} /></label>
         
      ))}
     
    </div>
  )
}

export default Button