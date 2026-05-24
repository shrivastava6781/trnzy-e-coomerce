import React from 'react'
import "./FreeShiping.css"

const FreeShiping = () => {
  return (
    <div className='free-shipping-container'>
      <div className='shipping-box'>
        <div className='left-shipping-box'><i className="bi bi-truck"></i></div>
        <div className='right-shipping-box'>
          <div className='title'>Free Shipping</div>
          <div className='des'>Free Shipping for order above 400</div>
        </div>
      </div>      
      <div className='shipping-box'>
        <div className='left-shipping-box'><i className="bi bi-credit-card"></i></div>
        <div className='right-shipping-box'>
          <div className='title'>Flexible Payment</div>
          <div className='des'>Multiple Secure payment options.</div>
        </div>
      </div>      
      <div className='shipping-box'>
        <div className='left-shipping-box'><i className="bi bi-headset"></i></div>
        <div className='right-shipping-box'>
          <div className='title'>24 x 7 Support</div>
          <div className='des'>We support online all days</div>
        </div>
      </div>
    </div>
  )
}

export default FreeShiping