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
  const [editErrors,setEditErrors] = useState([]);
  const [thisProdDisc, setThisProdDisc] = useState([]);

  useEffect(() => {
    dispatch(productActions.loadProduct(id))
    dispatch(discussionActions.loadProdDiscussions(id))
  }, [dispatch]) 

  useEffect(() => {
    let discs = [];
    setThisProdDisc(discs)
    Object.values(allDiscussions).forEach(discussion => {
      if (discussion.productId === id) discs.push(discussion)
    })
    setThisProdDisc(discs)
  },[allDiscussions])

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
    .then(() => setShowEditForm(!showEditForm))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setEditErrors(data.errors);
    });


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
        className="new-product-form"
        onSubmit={e => {
        e.preventDefault();
        submitProductEdits();
        }}>
        <ul className="new-product-errors-list">
            {editErrors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className='label'>
          Product Title:
        </label>
        <input onChange={e => setProductTitle(e.target.value)} type="text" className="product-edits" placeholder={product?.productTitle} value={productTitle} />
        <label className='label'>
        Product Icon:
        </label>
        <input onChange={e => setMainIcon(e.target.value)} type="text" className="product-edits" placeholder={product?.mainIcon} value={mainIcon} />
        <label className='label'>
        Product Main Image:
        </label>
        <input onChange={e => setMainImage(e.target.value)} type="text" className="product-edits" placeholder={product?.mainImage} value={mainImage} />
        <label className='label'>
        Main Image alt-tag:
        </label>
        <input onChange={e => setMainImageAlt(e.target.value)} type="text" className="product-edits" placeholder={product?.mainImageAlt} value={mainImageAlt} />
        <label className='label'>
          Product Description:
        </label>
        <input onChange={e => setDescription(e.target.value)} type="text" className="product-edits" placeholder={product?.description} value={description} />
        <button className="product-edit-submit" type='submit' >Submit Edits</button>
      </form>}
      <h3 className="new-discussion-starter">
        Discuss this product!
      </h3>
      <div className="discussion-list-container">
          {thisProdDisc.length > 0 &&
            thisProdDisc.map(discussion => 
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