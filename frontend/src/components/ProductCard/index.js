import React from "react";
import "./ProductCard.css";

function ProductCard({product}) {
  // if no main icon, use a default
  let desc = product.description
  if (desc.length > 100) desc = desc.slice(0,100).replace(/(\s)\S*$/, "") + "..."

  return (
    <>
      <div className="product-card-container" >
        <img className="product-icon" src={product?.mainIcon} alt={product.mainImageAlt}/>
        <div className="product-title-description-container">
          <div className="product-title" >{product.productTitle}</div>
          <div className="product-description" >{desc}</div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;