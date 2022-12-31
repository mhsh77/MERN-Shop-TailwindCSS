import axios from "axios"
import { setError, setLoading } from "../reducers/errorAndLoadingReducer"
import { setUser } from "../reducers/userReducer"
axios.defaults.withCredentials = true
export const login =(email,password)=> async (dispatch) => {
    dispatch(setLoading(true))

    const {data} = await axios.post('/api/v1/login',{email,password})
    .catch(function (error) {
        if (error.response) {
          
          dispatch(setError(error.response.data.errMessage))
          dispatch(setLoading(false))
        }
      });
    if(data.success){
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        dispatch(setError(null))
        
    }else{
        dispatch(setError(data.errMessage))
    }
}

export const register =(name,email,password)=> async (dispatch) => {
    dispatch(setLoading(true))
    
    const {data} = await axios.post('/api/v1/register',{email,password,name})
    .catch(function(error){
        if(error.response){
            dispatch(setError(error.response.data.errMessage))
            dispatch(setLoading(false))
        }
    });
    if(data.success){
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        dispatch(setError(null))
    }else{
        dispatch(setError(data.errMessage))
    }
}
// create a route to profile to get me cerdintials

export const me = () => async (dispatch) => {
    dispatch(setLoading(true))
    const {data} = await axios.get('/api/v1/me')
    .catch(function(error){
        if(error.response){
            dispatch(setError(error.response.data.errMessage))
            dispatch(setLoading(false))
        }
    });
    if(data.success){
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        dispatch(setError(null))
        
    }else{
        dispatch(setError(data.errMessage))
    }

}