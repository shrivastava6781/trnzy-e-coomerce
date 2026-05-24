import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const [order, setOrder] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?.id;

  useEffect(() => {
    fetchLatestOrder();
  }, []);

  const fetchLatestOrder = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce-backend-9rq3.onrender.com/api/order/${userId}`
      );

      // latest order (you sorted desc in backend)
      console.log("asdfghjkl:- ", res.data.orders[0])
      setOrder(res.data.orders[0]);
    } catch (err) {
      console.log(err);
    }
  };

  if (!order) return <h2>Loading order...</h2>;

  return (
    <div className="place-order">
      <div className="success-box">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Your order has been confirmed.</p>
        <p className="payment-id">
          Payment ID: {order.paymentId}
        </p>
      </div>

      {/* ADDRESS */}
      <div className="section">
        <h3>📍 Delivery Address</h3>
        <p><strong>{order.address.fullName}</strong></p>
        <p>{order.address.phone}</p>
        <p>
          {order.address.house}, {order.address.area}
        </p>
        <p>
          {order.address.city}, {order.address.state} - {order.address.pincode}
        </p>
        <p>{order.address.landmark}</p>
      </div>

      {/* ITEMS */}
      <div className="section">
        <h3>🛒 Order Items</h3>

        {order.items.map((item, index) => (
          <div className="order-item" key={index}>
            <img
              src={`https://ecommerce-backend-9rq3.onrender.com/${item.image}`}
              alt={item.name}
            />

            <div className="item-info">
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Qty: {item.quantity}</p>
              <p>Total: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="section summary">
        <h3>💰 Order Summary</h3>

        <div className="row">
          <span>Total Amount</span>
          <span>₹{order.amount}</span>
        </div>

        <div className="row">
          <span>Status</span>
          <span className="status">{order.orderStatus}</span>
        </div>

        <div className="row">
          <span>Order Date</span>
          <span>
            {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;