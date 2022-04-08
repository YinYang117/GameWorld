import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import * as productActions from '../../store/products';
import * as discussionActions from '../../store/discussions';
import DiscussionCard from "../DiscussionCard";
import './ProductDetailsPage.css';

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { productId } = useParams();
  let id = parseInt(productId);
  const sessionUser = useSelector(state => state.session.user);
  const allDiscussions = useSelector(state => state.discussions)
  const product = useSelector(state => state?.products[id]);
  let ownerId = useSelector(state => state?.products[id]?.ownerId);

  const [productTitle, setProductTitle] = useState(product?.productTitle)
  const [mainIcon, setMainIcon] = useState(product?.mainIcon);
  const [mainImage, setMainImage] = useState(product?.mainImage);
  const [mainImageAlt, setMainImageAlt] = useState(product?.mainImageAlt);
  const [description, setDescription] = useState(product?.description);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [newDiscussionMessage, setNewDiscussionMessage] = useState('')

  useEffect(() => {
    dispatch(productActions.loadProduct(id))
    dispatch(discussionActions.loadProdDiscussions(id))
  }, [dispatch]) 

  useEffect(() => {
   setIsOwner(sessionUser?.id === ownerId)
  }, [product, ownerId]) 


  const submitProductEdits = () => {
    const newProductData = product;
    // I use this ^ because ownerId exists, but I wont allow it to be edited and still need it there
    if (productTitle) newProductData.productTitle = productTitle
    if (mainIcon) newProductData.mainIcon = mainIcon
    if (mainImage) newProductData.mainImage = mainImage
    if (mainImageAlt) newProductData.mainImageAlt = mainImageAlt
    if (description) newProductData.description = description

    dispatch(productActions.editProduct(newProductData))
    setShowEditForm(!showEditForm)
  };

  const deleteProductSubmit = () => {
    dispatch(productActions.deleteProduct(id))
    .then(history.push('/')) // Go home after delete
  }

  const submitNewDiscussion = () => {
    const newDiscussion = {};
    newDiscussion.userId = sessionUser.id
    newDiscussion.productId = productId
    newDiscussion.message = newDiscussionMessage

    dispatch(discussionActions.newDiscussion(newDiscussion))
  }

  return (
    <>
      {product && <div className="product-details-page">
        <img
          className="product-card-image"
          src={product.mainImage}
          alt={product.mainImageAlt}
        />
        <div className='product-title'>
          {product.productTitle}
        </div>
        <div className="product-description">{product?.description}</div>
        <div className='button-container'>
          {isOwner && <button id="product-edit" onClick={e => setShowEditForm(!showEditForm)}>Edit</button>}
          {isOwner && <button id="product-delete" onClick={deleteProductSubmit} >Delete</button>}
          {/* <button onClick={redirectHome}>Back to Home Page</button> */}
        </div>
      </div>}
      {showEditForm && isOwner &&
      <form 
        onSubmit={e => {
        e.preventDefault();
        submitProductEdits();
        }}>
        <input onChange={e => setProductTitle(e.target.value)} type="text" className="product-product-title" placeholder={product?.productTitle} value={productTitle} />
        <input onChange={e => setMainIcon(e.target.value)} type="text" className="product-mainIcon" placeholder={product?.mainIcon} value={mainIcon} />
        <input onChange={e => setMainImage(e.target.value)} type="text" className="product-mainImage" placeholder={product?.mainImage} value={mainImage} />
        <input onChange={e => setMainImageAlt(e.target.value)} type="text" className="product-mainImageAlt" placeholder={product?.mainImageAlt} value={mainImageAlt} />
        <input onChange={e => setDescription(e.target.value)} type="text" className="product-description" placeholder={product?.description} value={description} />
        <button className="product-edit-submit" type='submit' >Submit Edits</button>
      </form>}
      <div className="discussion-list-container">
          {Object.keys(allDiscussions).length > 0 &&
            Object.values(allDiscussions).map(discussion => 
              <DiscussionCard key={discussion.id} discussion={discussion} />
            )
          }
      </div>
      <div className="new-discussion-starter">
        Discuss this product!
      </div>
      {sessionUser &&
      <form 
        onSubmit={e => {
        e.preventDefault();
        submitNewDiscussion();
        }}>
        <input className="new-discussion-message" onChange={e => setNewDiscussionMessage(e.target.value)} type="text" placeholder="Share your opinion!" value={newDiscussionMessage} />
        <button className="new-discussion-submit" type='submit' >Submit New Discussion</button>
      </form>}
    </>
  );
}

export default ProductDetailsPage;