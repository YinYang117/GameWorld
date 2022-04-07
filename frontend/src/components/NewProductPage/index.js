import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as productActions from '../../store/products'
import './NewProductPage.css';

function NewProductPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [ownerId, setOwnerId] = useState(sessionUser?.id);
  const [productTitle, setProductTitle] = useState("");
  const [mainIcon, setMainIcon] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [mainImageAlt, setMainImageAlt] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!sessionUser) history.push('/')
  }, [sessionUser]) 

  const submitNewProduct = () => {
    const newProductData = {};
    setOwnerId(sessionUser.id)
    newProductData.ownerId = ownerId
    newProductData.productTitle = productTitle
    newProductData.mainIcon = mainIcon
    newProductData.mainImage = mainImage
    newProductData.mainImageAlt = mainImageAlt
    newProductData.description = description

    dispatch(productActions.newProduct(newProductData))
  };

  return (
    <>
      <p>
        Sup Ryan. How am I doing?
      </p>
      <div>
        So far, doing well
      </div>
      <form
        onSubmit={e => {
        e.preventDefault();
        submitNewProduct();
        }}>
        <input onChange={e => setProductTitle(e.target.value)} type="text" className="product-product-title" placeholder='productTitle' value={productTitle} />
        <input onChange={e => setMainIcon(e.target.value)} type="text" className="product-mainIcon" placeholder='mainIcon' value={mainIcon} />
        <input onChange={e => setMainImage(e.target.value)} type="text" className="product-mainImage" placeholder='mainImage' value={mainImage} />
        <input onChange={e => setMainImageAlt(e.target.value)} type="text" className="product-mainImageAlt" placeholder='mainImageAlt' value={mainImageAlt} />
        <input onChange={e => setDescription(e.target.value)} type="text" className="product-description" placeholder='description' value={description} />
        <button className="product-edit-submit" type='submit' >Submit New Product</button>
      </form>
    </>
  );
}

export default NewProductPage;