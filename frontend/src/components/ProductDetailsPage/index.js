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
const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(productActions.loadProduct(id))
    dispatch(discussionActions.loadProdDiscussions(id))
  }, [dispatch]) 

  useEffect(() => {
   setIsOwner(sessionUser?.id === ownerId)
  }, [product, ownerId, sessionUser]) 


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
    setErrors([]);
    newDiscussion.userId = sessionUser.id
    newDiscussion.productId = productId
    newDiscussion.message = newDiscussionMessage

    dispatch(discussionActions.newDiscussion(newDiscussion))
    .then(() => {
      setNewDiscussionMessage('')
    })
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }

  return (
    <>
      {product && <div className="product-details">
        <img
          className="product-card-image"
          src={product.mainImage}
          alt={product.mainImageAlt}
        />
        <h3 className='product-title'>
          {product.productTitle}
        </h3>
        <div className="product-description">{product?.description}</div>
        <div className='button-container'>
          {isOwner && <span className="owner-options-text" >Owner Options:</span>}
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
      <h3 className="new-discussion-starter">
        Discuss this product!
      </h3>
      <div className="discussion-list-container">
          {Object.keys(allDiscussions).length > 0 &&
            Object.values(allDiscussions).map(discussion => 
              <DiscussionCard key={discussion.id} discussion={discussion} />
            )
          }
      </div>
      {sessionUser &&
      <>
        <ul className="new-product-errors-list">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <form className="new-discussion-form"
          onSubmit={e => {
          e.preventDefault();
          submitNewDiscussion();
          }}>
          <input className="new-discussion-message" onChange={e => setNewDiscussionMessage(e.target.value)} type="text-area" placeholder="Share your opinion!" value={newDiscussionMessage} />
          <button className="new-discussion-submit" type='submit' >Submit New Discussion</button>
        </form>
      </>}
    </>
  );
}

export default ProductDetailsPage;