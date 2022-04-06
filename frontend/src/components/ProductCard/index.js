import React from "react";
import { useHistory } from "react-router-dom"
import "./ProductCard.css";

function ProductCard({product}) {
  // if no main icon, use a default
  const history = useHistory();
  const handleClick = () => {
    history.push(`/products/${product.id}`)
  }

  return (
    <>
      <div onClick={handleClick} className="product-card-container" >
        <img className="product-icon" src={product?.mainIcon} alt={product.mainImageAlt}/>
        <div className="product-title-description-container">
          <div className="product-title" >{product.productTitle}</div>
          <div className="product-description" >{product.description}</div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;