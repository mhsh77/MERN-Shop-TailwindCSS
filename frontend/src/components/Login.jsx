import React,{useEffect} from 'react'
import Header from './layout/Header'
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../redux/reducers/userReducer';
import { login } from '../redux/actions/authenticationActions';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import Loading from './Loading';
import { Formik } from 'formik';
const Login = () => {
    const {isLoading,error} = useSelector((state) => state.errorAndLoading)
    const {user} = useSelector((state)=>state.authentication)
    const alert = useAlert()
    console.log(user);
    const navigate = useNavigate();
    const dispatich = useDispatch();
    
    useEffect(() => {
        if(error){
            return alert.error(error)
            }
        if(user){
            alert.removeAll()
            alert.success('loggedin')
            navigate('/')
        }
    }, [error,user])
    
    return (
      <>
        <Header/>
        {isLoading ? <Loading/>:(
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
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
                        <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
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