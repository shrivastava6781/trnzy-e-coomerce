import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/auth';
import commonAPI from '../API/commonAPI';

function Login() {
  const [form, setForm] = useState({ 
    email: '', 
    password: ''
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const sendData = await axios.post('https://ecommerce-backend-9rq3.onrender.com/api/login',form);
      dispatch(login(sendData.data))
      // console.log("sendData.data", sendData.data?.user?.id)
      commonAPI.fetchCart(dispatch, sendData.data?.user?.id);
      commonAPI.getFavoriteProduct(dispatch, sendData.data?.user?.id);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className='login-page'>
      <div className="login-container">
      <div className="left-side-login">
        <img src='/images/signin.png' alt="Login" />
      </div>

      <div className="right-side-login">
        <div className="company-logo">
          Trnzy
        </div>
        <div className='login-form'>
        <div className="top-login">
          <h3>Welcome Back</h3>
          <p>Enter your email and password to access your account</p>
        </div>

        <form className='formd-data' onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-footer">
            <p className='forgot-link' onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </p>
          </div>

          <button type="submit" className="login-btn" >Sign In</button>
        </form>
        </div>
        <p className="signup-link">
          Don't have an account? <a href="#" onClick={()=>navigate('/signup')}>Sign Up</a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;