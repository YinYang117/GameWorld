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
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!sessionUser) history.push('/')
  }, [sessionUser]) 

  const submitNewProduct = () => {
    const newProductData = {};
    setErrors([]);
    setOwnerId(sessionUser.id)
    newProductData.ownerId = ownerId
    newProductData.productTitle = productTitle
    newProductData.mainIcon = mainIcon
    newProductData.mainImage = mainImage
    newProductData.mainImageAlt = mainImageAlt
    newProductData.description = description

    dispatch(productActions.newProduct(newProductData))
    .then(() => history.push('/'))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="new-product-page" >
      <h2>Welcome to the Create a New Product Page!</h2>
      <form
      className="new-product-form"
        onSubmit={e => {
        e.preventDefault();
        submitNewProduct();
        }}>
        <label className='label'>
          Product Title:
        </label>
        <input onChange={e => setProductTitle(e.target.value)} type="text" className="product-product-title" placeholder='productTitle' value={productTitle} />
        
        <label className='label'>
        Product Icon:
        </label>
          <input onChange={e => setMainIcon(e.target.value)} type="text" className="product-mainIcon" placeholder='mainIcon' value={mainIcon} />
        <label className='label'>
        Product Main Image:
        </label>
          <input onChange={e => setMainImage(e.target.value)} type="text" className="product-mainImage" placeholder='mainImage' value={mainImage} />
        <label className='label'>
        Main Image alt-tag:
        </label>
          <input onChange={e => setMainImageAlt(e.target.value)} type="text" className="product-mainImageAlt" placeholder='mainImageAlt' value={mainImageAlt} />
        <label className='label'>
          Product Description:
        </label>
          <input onChange={e => setDescription(e.target.value)} type="text" className="product-description" placeholder='description' value={description} />
        <ul className="new-product-errors-list">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <button className="product-edit-submit" type='submit' >Submit New Product</button>
      </form>
    </div>
  );
}

export default NewProductPage;