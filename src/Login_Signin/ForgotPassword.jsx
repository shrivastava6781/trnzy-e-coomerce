 import React, { useState } from 'react'
import axios from 'axios'
import './forgotpassword.css'; 
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      alert("Email required")
      return
    }
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`,
        { email }
      )
      alert(response.data.message)
      navigate('/login')
    }
    catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      )
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-page'>
      <div className="login-container">
        <div className="left-side-login">
          <img
            src='/images/signin.png'
            alt="Forgot Password"
          />
        </div>
        <div className="right-side-login">
          <div className="company-logo">
            Trnzy
          </div>

          <div className='login-form'>

            <div className="top-login">
              <h3>Forgot Password</h3>

              <p>
                Enter your email to receive
                reset link
              </p>
            </div>

            <form
              className='formd-data'
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />

              </div>

              <button
                type='submit'
                className='login-btn'
              >
                {
                  loading
                  ?
                  "Sending..."
                  :
                  "Send Reset Link"
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword