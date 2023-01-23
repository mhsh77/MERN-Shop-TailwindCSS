
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductInfo from './components/ProductInfo';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { me } from './redux/actions/authenticationActions';
import { useEffect } from 'react';
import Password from './components/Password';
import ForgotPass from './components/ForgotPass';
import ResetPass from './components/ResetPass';
import Navbar from './components/Navbar';
import Shipping from './components/Shipping';
import Button from './components/layout/Button1';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Success from './components/Success';
import Users from './components/Users';
import Products from './components/Products';
import Button1 from './components/layout/Button1';
import OrdersAdmin from './components/OrdersAdmin';

function App() {
  const {user,role} = useSelector((state)=>state.authentication)
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      dispatch(me())
      //console.log(role);
    } catch (error) {
      
    }
    
  }, [dispatch])
  
  return (
      <div className="App bg-bgcolor text-white h-screen flex flex-col">
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home user={user}/>} />
            <Route path="/nav" element={<Navbar/>}/>
            <Route path="/product/:productID" element={<ProductInfo user={user}/>} />
            <Route path="/search/:keyword" element={<Home user={user}/>} />
            <Route path="/register" element={<Register user={user}/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/me" element={user?<Profile user={user}/>:<Login/>}/>
            <Route path="/newpass" element={user?<Password user={user}/>:<Login/>}/>
            <Route path="/forgetpass" element={<ForgotPass />}/>
            <Route path="/resetpass/:token" element={<ResetPass />}/>
            <Route path='/shipping' element={<Shipping user={user}/>} />
            <Route path='/sandbox' element={<Button/>} />
            <Route path='/dashboard' element={(user && role=='admin')? <Dashboard user={user}/>:<Login/>} />
            <Route path='/admin/users' element={(user && role=='admin')? <Users user={user}/>:<Login/>} />
            <Route path='/orders' element={(user)? <Orders user={user}/>:<Login/>} />
            <Route path='/admin/products' element={(user && role=='admin')? <Products user={user}/>:<Login/>} />
            <Route path='/admin/orders' element={(user && role=='admin')? <OrdersAdmin user={user}/>:<Login/>} />
            <Route path='/success' element={<Success user={user}/>} />
            <Route path='/test' element={<Button1/>} />
            
          </Routes>
        </BrowserRouter>
      </div>
    
    
  );
}

export default App;
