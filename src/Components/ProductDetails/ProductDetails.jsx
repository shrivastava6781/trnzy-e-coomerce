import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ProductDetails.css";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setProduct } from '../../redux/features/ProductSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const {product, loading} = useSelector((state)=>state.productSlice)

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      dispatch(setProduct(res.data.product))
      setMainImage(res.data.product.image);
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false))
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      alert("Login first");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/add/cart/${user.user.id}`,
        { productId: id, quantity: qty },
      );

      alert("Added to cart 🛒");
      navigate('/cart')
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!product) return <p className="error">Not Found</p>;

  const images = [product.image, product.image, product.image];

  const finalPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className="pd-container">

      {/* LEFT */}
      <div className="pd-left">

        <div className="pd-thumbs">
          {images.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:5000/${img}`}
              onClick={() => setMainImage(img)}
              className={mainImage === img ? "active" : ""}
            />
          ))}
        </div>

        <div className="pd-main">
          <img src={`http://localhost:5000/${mainImage}`} alt="" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="pd-right">

        <div className="title">{product.name}</div>

        <div className="desc">{product.description}</div>

        {/* PRICE */}
        <div className="price-row">
          <span className="price">₹{finalPrice}</span>
          <span className="old-price">₹{product.price}</span>
          <span className="discount">{product.discount}% OFF</span>
        </div>

        {/* RATING */}
        <div className="rating">
          ⭐ {product.rating} / 5
        </div>

        {/* SIZE */}
        <div className="size-section">
          <p>Size</p>
          <div className="sizes">
            {["M", "XL", "S", "XXL", "L"].map(size => (
              <button
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* QTY */}
        <div className="qty-box">
          <div>Quantity</div>
          <div className="qty">
            <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
        </div>

        {/* BUTTONS */}
        <button className="cart-btn" onClick={handleAddToCart}>
          Add to cart - ₹{finalPrice}
        </button>

        <button className="buy-btn">Buy it now</button>
      </div>
    </div>
  );
};

export default ProductDetails;