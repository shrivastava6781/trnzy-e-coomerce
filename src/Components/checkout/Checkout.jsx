import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setCartItems } from "../../redux/features/CartSlice";
import { addOrder } from "../../redux/features/OrderSlice";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cartSlice);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    house: "",
    area: "",
    landmark: "",
    addressType:""
  });

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?.id;

  useEffect(() => {
    fetchCart();
    fetchAddress();
  }, []);

  // 🛒 Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/${userId}`
      );
      console.log("fds", res.data.cartData)
      dispatch(setCartItems(res.data.cartData.items))
    } catch (err) {
      console.log(err);
    }
  };

  // 📍 Fetch Address
  const fetchAddress = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/get/address/${userId}`
      );
      console.log(res.data.addressData.addressData)
      setAddresses(res.data.addressData.addressData || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ➕ Add Address
  const handleAddAddress = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/address/${userId}`,
        { ...formData }
      );

      setAddresses([...addresses, res.data]);
      setShowForm(false);
      setFormData({
        fullName: "",
        phone: "",
        pincode: "",
        state: "",
        city: "",
        house: "",
        area: "",
        landmark: "",
        addressType: "",
      });
      fetchAddress()
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlaceOrder = async () => {
    if (selectedAddress === null) {
      alert("Please select address");
      return;
    }

    try {
      // 🔥 Step 1: Create order from backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {
          amount: Math.floor(total), // amount in rupees
        }
      );

      const order = data.order;
      console.log("checkout 1:- ", order, cartItems)

      // 🔥 Step 2: Open Razorpay
      const options = {
        key: "rzp_test_ScCQhphcnNd2q1", // your test key
        amount: Math.floor(order.amount),
        currency: "INR",
        name: "E-Bharat",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            // 🔥 Step 3: Verify payment
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );
            console.log("checkout 2:- ",verifyRes.data.success,  cartItems)

            if (verifyRes.data.success) {
              // 🔥 Step 4: Save order in DB
              const orderItems = cartItems.map((item) => ({
                // Common Fields
                productType: item.productType || "normal",
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,

                // Custom Product Fields
                baseProductId: item.baseProductId || null,
                printDesignId: item.printDesignId || null,
                uploadedDesign: item.uploadedDesign || "",
                previewImage: item.previewImage || "",
                size: item.size || "",
                color: item.color || "",
                printPosition: item.printPosition || "front",

                designConfig: item.designConfig
                  ? 
                    {
                      x: item.designConfig.x,
                      y: item.designConfig.y,
                      width: item.designConfig.width,
                      rotation: item.designConfig.rotation,
                    }
                  : 
                    {},
              }));

              const orderRes = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/order`,
                {
                  userId,
                  items: orderItems,
                  address: addresses[selectedAddress],
                  amount: Math.floor(total),
                  paymentId: response.razorpay_payment_id,
                }
              );
              console.log("checkout 3:- ",orderRes)

              // ✅ NOW WORKS
              dispatch(addOrder(orderRes.data));
              
              // 👉 2. CLEAR CART IN REDUX
              dispatch(clearCart());
              // clear cart from DB
              await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/clear/${userId}`
              );

              console.log("checkout 4:- ", order, cartItems)
              navigate("/place-order");
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.log(err);
          }
        },

        prefill: {
          name: addresses[selectedAddress].fullName,
          contact: addresses[selectedAddress].phone,
        },

        theme: {
          color: "#2874f0",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
    }
  };

  // 🧮 Calculations
  const subtotal = cartItems?.reduce((acc, item) => acc + item.quantity * item.price,0) || 0;

  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const discount = subtotal > 3000 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  if (!cartItems) return <p>Loading...</p> ;

  return (
    <div className="checkout">
      <h2>Checkout 🧾</h2>

      <div className="cart-wrapper">
        {/* CART ITEMS */}
        <div className="cart-items">


          {/* ADDRESS SECTION */}
          <div className="address-box">
            <h3>Select Address</h3>

            {addresses.length === 0 ? (
              <div className="no-address">
                <p>No Address Found</p>
                <button onClick={() => setShowForm(true)}>
                  Add Address
                </button>
              </div>
            ) : (
              <>
                {addresses.map((addr, index) => (
                  <div
                    key={index}
                    className={`address-card ${
                      selectedAddress === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedAddress(index)}
                  >
                    <div className="full-name">{addr.fullName} ({addr.addressType}) <span>{addr.phone}</span></div>

                    <p className="address-line">
                      {addr.house}, {addr.area}
                    </p>
                  </div>
                ))}
                <button
                  className="add-btn"
                  onClick={() => setShowForm(true)}
                >
                  + Add New Address
                </button>
              </>
            )}
          </div>
          
          {/* ADDRESS FORM */}
          {showForm && (
            <div className="address-form">
              <div className="header-title">
                <h3>Add Address</h3>
                <div className="cross-btn" onClick={() => setShowForm(false)}>
                  X
                </div>
              </div>

              <div className="form-grid">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="House No / Building"
                  value={formData.house}
                  onChange={(e) =>
                    setFormData({ ...formData, house: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Area / Street"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Landmark"
                  value={formData.landmark}
                  onChange={(e) =>
                    setFormData({ ...formData, landmark: e.target.value })
                  }
                />

                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={(e) =>
                    setFormData({ ...formData, addressType: e.target.value })
                  }
                >
                  <option value="">Select Type</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                </select>

              </div>

              <button onClick={handleAddAddress}>
                Save Address
              </button>
            </div>
          )}

        </div>

        {/* SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Total MRP</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="free">FREE</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;