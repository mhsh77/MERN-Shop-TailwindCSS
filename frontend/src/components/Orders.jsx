import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrderes } from '../redux/actions/productActions'
import Header from './layout/Header'

function Orders({user}) {
    const dispatch = useDispatch()
    const {orders} = useSelector(state=> state.orders)
    useEffect(() => {
      dispatch(GetOrderes())
      console.log(orders);
    }, [])
    
  return (
    <div>
        <Header user={user} />
        <div className="container w-full mx-auto mt-10">
            <h1 className='text-3xl'>Orders:</h1>
            <div>
            <div className='border-b-2 flex flex-row justify-between md:mx-3 py-7 font-bold text-2xl'>
                        <div>Address</div>
                        <div>Payment Id</div>
                        <div>Total Price</div>
                        <div>Date</div>
                        <div>Order Status</div>
                    </div>
                {orders?.map(order=>(
                    <div className='border-b-2 flex flex-row justify-between md:mx-3 py-7'>
                        <div>{order.shippingInfo.address}</div>
                        <div>{order.paymentInfo.id}</div>
                        <div>{order.totalPrice}</div>
                        <div>{order.createdAt}</div>
                        <div className={order.orderStatus=='Delivered'?' text-green-300':'text-orange-300'}>{order.orderStatus}</div>
                    </div>
                    
                ))}
                {!orders && (
                    <>
                    <div className="container w-full mx-auto mt-10 flex justify-center items-center">
                        <h1>There are no orders submited yet!!</h1>
                    </div>
                    </>
                )}
            </div>
        </div>
        
    </div>
  )
}

export default Orders