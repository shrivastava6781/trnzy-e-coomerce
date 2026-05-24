import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./RelatedProduct.css"

const RelatedProduct = () => {

  const [items, setitems] = useState([]);
    const [loading, setLoading] = useState(false);


  const fetchrRlated = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://ecommerce-backend-9rq3.onrender.com/api/products');
      setitems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("related could not be loaded.");
    }
  };

  useEffect(() => {
    fetchrRlated();
  }, []);

  const handleGoToDetail = (product) => {
    const url = `/product/${product._id}`;
    window.open(url, '_blank'); // ✅ Opens in new tab
  };

  return (
    <>
    <div className='new-related'>
      <div className='related-top'>
        <div className='related-heading'> Related Products</div>
        <div className='related-desc'> Explore <span>Related Products</span></div>
      </div>
        <div className='related-middle'>
          {items.map(product => (
            <div key={product._id} className='cart' onClick={() => handleGoToDetail(product)}>
              <div className='cart-top-image'>
                <img src={`https://ecommerce-backend-9rq3.onrender.com/uploads/${product.images[0]}`} alt={product.name} />
              </div>
              <div className='cart-bottom'>
                <div className='cart-header'>
                  <div className='heading'>{product.name}</div>
                  <div className='like'>
                    <i className="bi bi-suit-heart"></i>
                  </div>
                </div>
                <div className='cart-des'>
                  {product.description}
                </div>
                <div className='cart-prize'>₹ {product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='related-bottom'>
          <button className='show-more' onClick={() => navigate('/allproducts')}>Show More <i className="bi bi-arrow-right-circle"></i></button>
        </div>
    </div>
    </>
  )
}

export default RelatedProduct