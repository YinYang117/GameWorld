import React from "react";
import "./ProductCard.css";

function ProductCard({product}) {
 
  return (
    <>
      <div className="product-card-container" >
        <div>{product.productTitle}</div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default ProductCard;