// DesignSelector.jsx

import axios from "axios";
import React, { useEffect } from "react";
import "./DesignSelector.css";
import { useDispatch, useSelector } from "react-redux";
import {setCustomizePrint} from "../../redux/features/customizeSlice";

const DesignSelector = ({ selectedDesign, setSelectedDesign}) => {

  const dispatch = useDispatch();
  const { customizePrint } = useSelector( (state) => state.customize);

  async function getPrints() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get/products`);

      const printProducts = response.data.product.filter(
        (item) => item.type === "print"
      );
      dispatch(setCustomizePrint(printProducts));
    } 
    catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getPrints();
  }, []);

  return (
    <div className="design-selector">
      <h2 className="selector-title">Choose Design</h2>

      <div className="design-grid">
        {customizePrint.map((item) => (

          <div
            key={item._id}
            className={`design-card ${
              selectedDesign?._id == item._id
                ? 
                  "active-design"
                : 
                  ""
            }`}
            onClick={() =>setSelectedDesign(item)}
          >
            <div className="card-img">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
              alt={item.name}
            />
            </div>
            <div className="title">{item.name}</div>
            <div className="price-section">
              <span className="price">
                ₹{item.price - (item.price * item.discount) / 100}
              </span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default DesignSelector;