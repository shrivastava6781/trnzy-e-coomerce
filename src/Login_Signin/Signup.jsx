import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css'; 
import { useDispatch } from 'react-redux';
import { signin } from '../redux/features/auth';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }

    try {
      const sendData = await axios.post(
        'https://ecommerce-backend-9rq3.onrender.com/api/signup',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
        dispatch(signin(sendData));


      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      alert('Signup failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className='signup-page'>
      <div className="signup-container">
        <div className="right-side-signup">
          <div className="company-logo">Trnzy</div>

          <div className='signup-form'>
            <div className="top-signup">
              <h3>Create Account</h3>
              <p>Enter your details to register</p>
            </div>

            <form className='formd-data' onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

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

              <button type="submit" className="signup-btn">Sign Up</button>
            </form>

            <p className="signup-link">
              Already have an account? <a href='#' onClick={()=>navigate('/login')}>Login</a>
            </p>
          </div>
        </div>

        <div className="left-side-signup">
          <img src='/images/signin.png' alt="signin" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
