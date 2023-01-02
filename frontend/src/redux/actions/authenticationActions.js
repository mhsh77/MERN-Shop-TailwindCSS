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
export const logout = () => async (dispatch) => {
    dispatch(setLoading(true))
    const {data} = await axios.get('/api/v1/logout')
    .catch(function(error){
        if(error.response){
            dispatch(setError(error.response.data.errMessage))
            dispatch(setLoading(false))
        }
    });
    if(data.success){
        dispatch(setUser(null))
        dispatch(setLoading(false))
        dispatch(setError(null))
        
    }else{
        dispatch(setError(data.errMessage))
    }

}

export const updateProfile = (userData) => async (dispatch) => {
    dispatch(setLoading(true))
    const {data} = await axios.put('/api/v1/me/update',userData)
    .catch(function(error){
        if(error.response){
            dispatch(setError(error.response.data.errMessage))
            dispatch(setLoading(false))
        }
    });
    if(data.success){
        dispatch(setUser(null))
        dispatch(setLoading(false))
        dispatch(setError(null))
        
    }else{
        dispatch(setError(data.errMessage))
    }

}

export const updatePass = (oldPassword,password) => async (dispatch) => {
    dispatch(setLoading(true))
    const {data} = await axios.put('/api/v1/password/update',{oldPassword,password})
    .catch(function(error){
        if(error.response){
            dispatch(setError(error.response.data.errMessage))
            dispatch(setLoading(false))
        }
    });
    if(data.success){
        dispatch(setUser(null))
        dispatch(setLoading(false))
        dispatch(setError(null))
        
    }else{
        dispatch(setError(data.errMessage))
    }

}
export const restPassw = (password,confirmPassword,token) => async (dispatch) => {

const {data} = await axios.put(`/api/v1/password/reset/${token}`,{password,confirmPassword})
    .catch(function(error){
        if(error.response){
            dispatch(setError(error.response.data.errMessage))
            dispatch(setLoading(false))
        }
    });
    if(data.success){
        dispatch(setUser(null))
        dispatch(setLoading(false))
        dispatch(setError(null))
        
    }else{
        dispatch(setError(data.errMessage))
}}
export const forgetPass = (email) => async (dispatch) => {
    const {data} = await axios.post(`/api/v1/password/forgot`,{email})
    .catch(function(error){
        if(error.response){
            dispatch(setError(error.response.data.errMessage))
            dispatch(setLoading(false))
        }
    });
    if(data.success){
        dispatch(setUser(null))
        dispatch(setLoading(false))
        dispatch(setError(null))
        
    }else{
        dispatch(setError(data.errMessage))

    
}

}