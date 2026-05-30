import React, { useState } from "react";
import "./CustomizeProduct.css";

import ProductSelector from "./ProductSelector";
import DesignSelector from "./DesignSelector";
import PreviewSection from "./PreviewSection";

const CustomizeProduct = () => {

  // SELECTED PRODUCT
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // SELECTED DESIGN
  const [selectedDesign, setSelectedDesign] =
    useState(null);

  return (
    <div className="customize-page">

      <div className="customize-container">

        {/* LEFT SECTION */}
        <div className="customize-left">

          <ProductSelector
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />

          <DesignSelector
            selectedDesign={selectedDesign}
            setSelectedDesign={setSelectedDesign}
          />

        </div>

        {/* RIGHT SECTION */}
        <div className="customize-right">

          <PreviewSection
            selectedProduct={selectedProduct}
            selectedDesign={selectedDesign}
          />
        </div>

      </div>

    </div>
  );
};

export default CustomizeProduct;