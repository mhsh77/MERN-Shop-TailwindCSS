import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { me } from '../redux/actions/authenticationActions'
import { setError, setLoading } from '../redux/reducers/errorAndLoadingReducer'

function Protected({ children }) {
    const {isAuthenticated,user} = useSelector((state)=> state.authentication)
    
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
      dispatch(me())
      if (!isAuthenticated) {
        dispatch(setLoading(true))
        dispatch(setError('login first to access this page'))
        console.log('isnt authenticated');
        navigate('/login')
        dispatch(setLoading(false))
      }
    }, [])
    
    
      
   
  return (
    <>
    
    {isAuthenticated?children:<>{isLoading?<Loading/>:<></>}</>}
    </>
    )
}
export default Protected