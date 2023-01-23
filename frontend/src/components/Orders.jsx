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
    <>
        <Header user={user} />

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
                                    Address
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Payment ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                Total Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                Order Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders?.map(order=>(
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                
                                    <td class="px-6 py-4">
                                        <div class="font-normal text-gray-500">
                                            {order.shippingInfo.address}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="font-normal text-gray-500">
                                            {order.paymentInfo.id}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                        {order.totalPrice}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                        {order.createdAt}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div  className={order.orderStatus=='Delivered'?'flex items-center text-green-300':'flex items-center text-orange-300'}>
                                        {order.orderStatus}
                                        </div>
                                    </td>
                                </tr>

                                
                            ))
                           } 
                           
                        </tbody>
                    </table>
                </div>  
            </div>
        </div>   
    </>
  )
}

export default Orders