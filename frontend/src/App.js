
import './index.css';
import {
  RouterProvider,createBrowserRouter
} from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductInfo from './components/ProductInfo';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "product/:productID",
    element: <ProductInfo/>,
    
  },
]);
function App() {
  return (
      <div className="App">
        <Header/>
        <RouterProvider router={router} />
        <Footer/>
      </div>
    
    
  );
}

export default App;
