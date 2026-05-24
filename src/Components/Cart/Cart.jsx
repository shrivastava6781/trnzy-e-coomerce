import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, updateQuantity } from '../../redux/features/CartSlice';

const Cart = () => {
  const {cartItems} = useSelector((state)=>state.cartSlice)
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.user?.id;
  const dispatch = useDispatch()

  const navigate = useNavigate();

  // 🔥 Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${userId}`);
        dispatch(setCartItems(res.data.cartData?.items || []))
      } 
      catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };

    if (userId) fetchCart();
  }, [userId]);

  // 🔥 Update Quantity
  const updateQty = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/update`, {
        userId,
        productId,
        quantity
      });

      dispatch(updateQuantity(productId, quantity))
      dispatch(setCartItems(res.data.cartData?.items || []))


    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // 🔥 Remove Item
  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove`, {
        data: { userId, productId }
      });

      dispatch(updateQuantity(productId))
      dispatch(setCartItems(res.data.cartData?.items || []))
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  // 🔥 Price Calculation (FIXED quantity)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const discount = subtotal > 3000 ? 0.1 * subtotal : 0;
  const total = subtotal - discount;

  return (
    <div className='cart-container'>

      <h2 className='cart-title'>🛒 Your Shopping Cart</h2>

      <div className='cart-wrapper'>

        {/* LEFT */}
        <div className='cart-items'>
          {cartItems.length === 0 ? (
            <p className='empty'>Cart is empty 😢</p>
          ) : (
            cartItems.map(item => (
              <div className='cart-card' key={item._id}>

                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                  alt={item.name}
                />

                <div className='cart-info'>
                  <h3>{item.name}</h3>

                  <span className='price'>₹{item.price}</span>

                  {/* Quantity */}
                  <div className='qty-box'>
                    <button onClick={() => updateQty(item.productId, item.quantity - 1)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => updateQty(item.productId, item.quantity + 1)}>
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    className='remove-btn'
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className='cart-summary'>
          <h3>Order Summary</h3>

          {/* Items count */}
          <div className='summary-row'>
            <span>Total Items</span>
            <span>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>

          {/* Total MRP */}
          <div className='summary-row'>
            <span>Total MRP</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          {/* Discount */}
          <div className='summary-row'>
            <span>Discount (10%)</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>

          {/* Delivery */}
          <div className='summary-row'>
            <span>Delivery Charges</span>
            <span className='free'>FREE</span>
          </div>

          <hr />

          {/* Final Total */}
          <div className='summary-total'>
            <span>Total Amount</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <p className='save-msg'>
            🎉 You saved ₹{discount.toFixed(2)} on this order!
          </p>

          <button
            className='checkout-btn'
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;