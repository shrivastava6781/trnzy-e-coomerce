import React from 'react'
import { useNavigate } from 'react-router-dom'
import './notfound.css'

function NotFound() {

  const navigate = useNavigate()

  return (

    <div className='notfound-page'>

      <div className='notfound-container'>

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for
          does not exist.
        </p>

        <button
          onClick={() => navigate('/')}
        >
          Back To Home
        </button>

      </div>

    </div>
  )
}

export default NotFound