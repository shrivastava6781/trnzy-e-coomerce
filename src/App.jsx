import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./App.css"
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home';
import Signup from './Login_Signin/Signup';
import Login from './Login_Signin/Login';
import ProdcutDetailsPage from './Pages/ProdcutDetailsPage';
import Cart from './Components/Cart/Cart';
import Navbar from './Components/Navbar/Navbar';
import Checkout from './Components/checkout/Checkout';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import AllProducts from './Components/AllProducts/AllProducts';
import { useEffect } from 'react';
import commonAPI from './API/commonAPI';
import { useDispatch } from "react-redux";
import FavoriteProducts from './Components/FavoriteProducts/FavoriteProducts';
import Search from './Components/Search/Search';
import ContactUs from './Components/ContactUs/ContactUs';
import AboutUs from './Components/AboutUs/AboutUs';
import ForgotPassword from './Login_Signin/ForgotPassword';
import ResetPassword from './Login_Signin/ResetPassword';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.user?.id;
  const dispatch = useDispatch()


  // 🔥 Fetch Cart
  useEffect(() => {
    if (user){
      commonAPI.fetchCart(dispatch, userId);
      commonAPI.getFavoriteProduct(dispatch, userId);
    }
  }, []);
  return (
    <div className="main-container">
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/product/:id" element={<ProdcutDetailsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/favorite" element={<FavoriteProducts />} />
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/reset-password/:token" element={<ResetPassword />}/>
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;