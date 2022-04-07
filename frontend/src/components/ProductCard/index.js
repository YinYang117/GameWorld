import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import "./ProductCard.css";

function ProductCard({product}) {
  // if no main icon, use a default
  const history = useHistory();
  const handleClick = () => {
    history.push(`/products/${product.id}`)
  }
  const [shortDesc, setShortDesc] = useState('');

  if (product.description > 100) {
    setShortDesc(product.description.slice(0,100).replace(/(\s)\S*$/, "").concat('...'))
  }

  return (
    <>
      <div onClick={handleClick} className="product-card-container" >
        <img className="product-icon" src={product?.mainIcon} alt={product.mainImageAlt}/>
        <div className="product-title-description-container">
          <div className="product-title" >{product.productTitle}</div>
          <div className="product-description" >{shortDesc}</div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;