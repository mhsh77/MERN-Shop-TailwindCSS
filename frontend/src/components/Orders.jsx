import React from 'react'
import Header from './layout/Header'
function Orders({user}) {
  return (
    <div>
        <Header user={user} />
        <div className="container w-full mx-auto mt-10">
            <h1 className='text-3xl'>Orders:</h1>
        </div>
        
    </div>
  )
}

export default Orders