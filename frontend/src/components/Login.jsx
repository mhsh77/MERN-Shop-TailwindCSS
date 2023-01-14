import React,{useEffect} from 'react'
import Header from './layout/Header'
import { useDispatch,useSelector } from 'react-redux';

import { login } from '../redux/actions/authenticationActions';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import Loading from './Loading';
import { Formik } from 'formik';
const Login = () => {
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const alert = useAlert()
    const {loggedIn} = useSelector((state)=> state.authentication)
    //console.log(user);
    const navigate = useNavigate();
    const dispatich = useDispatch();
    
    useEffect(() => {
        if(error!="Login first to access this recourse" && error){
            alert.error(error)
        }
        if(loggedIn){
            navigate('/me')
        }
    }, [error])
    
    return (
      <>
        <Header/>
        {isLoading ? <Loading/>:(
        <div className='flex-1 text-primary items-center flex'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium  mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                        errors.email = 'Required';
                        } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                        errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                        dispatich(login(values.email,values.password))
                        setSubmitting(false);
                        
                        }, 400);
                    }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <h1 className='text-gray-500 pb-2'>Email</h1>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className="border-none rounded-lg shadow-md mb-2"
                        />
                        {errors.email && touched.email && errors.email}
                        <h1 className='text-gray-500 pb-2'>Password</h1>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className="border-none rounded-lg shadow-md mb-2"
                        />
                        {errors.password && touched.password && errors.password}
                        <button onClick={()=>navigate('/forgetpass')} className="mr-auto mb-2">forgot Password?</button>
                        <button type="submit" disabled={isSubmitting} className="bg-btn py-1 px-3 rounded-full text-white shadow-md">
                            Submit
                        </button>
                        <button onClick={()=>navigate('/register')} className=" bg-btnsecondary py-1 px-3 rounded-full text-white mt-2 shadow-md">
                            Register
                        </button>
                        </form>
                        
                    )}
                </Formik>
                
                
            </div>
        </div>)}

      </>
        
    );
};

export default Login;