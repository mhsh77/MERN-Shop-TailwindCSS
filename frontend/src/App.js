
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

function App() {
  const {user} = useSelector((state)=>state.authentication)
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      dispatch(me())
    } catch (error) {
      
    }
    
  }, [dispatch])
  
  return (
      <div className="App">
        
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
          </Routes>
        </BrowserRouter>
      </div>
    
    
  );
}

export default App;
