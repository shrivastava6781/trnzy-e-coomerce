import React, { useState } from 'react'
import axios from 'axios'
import './resetpassword.css'; 
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { token } = useParams()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!password) {
      alert("Password required")
      return
    }

    try {

      setLoading(true)

      const response = await axios.post(
        `https://ecommerce-backend-9rq3.onrender.com/api/reset-password/${token}`,
        { password }
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
            alt="Reset Password"
          />
        </div>

        <div className="right-side-login">

          <div className="company-logo">
            Trnzy
          </div>

          <div className='login-form'>

            <div className="top-login">

              <h3>Reset Password</h3>

              <p>
                Enter your new password
              </p>

            </div>

            <form
              className='formd-data'
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label>New Password</label>

                <input
                  type="password"
                  placeholder='Enter new password'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />

              </div>

              <button
                type='submit'
                className='login-btn'
              >
                {
                  loading
                  ?
                  "Updating..."
                  :
                  "Reset Password"
                }
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ResetPassword