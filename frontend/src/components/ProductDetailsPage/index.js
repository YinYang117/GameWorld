import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import * as productActions from '../../store/products'
import './ProductDetailsPage.css';


function ProductDetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  let { productId } = useParams();
  let id = parseInt(productId);
  const product = useSelector(state => state.products[id]);
  // let ownerData = useSelector(state => state.products[id].ownerId);

  const [mainIcon, setMainIcon] = useState(product?.mainIcon);
  const [mainImage, setMainImage] = useState(product?.mainImage);
  const [mainImageAlt, setMainImageAlt] = useState(product?.mainImageAlt);
  const [description, setDescription] = useState(product?.description);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    dispatch(productActions.aoriesntoiaresntieoan(id))
    // dispatch(productActions.loadSpotReviews(id))
    //store action to get spots
    console.log("reviews", reviews)
  }, [dispatch]);

  useEffect(() => {
    setIsOwner(sessionUser?.id === spot?.userId)
    console.log('user is owner:', isOwner)
  }, [sessionUser, product, isOwner]) 

  const redirectHome = () => {
    history.push('/')
  }

  const submitChanges = () => {
    const newSpotData = spot;
    if (world) newSpotData.world = world
    if (location) newSpotData.location = location
    if (mainImage) newSpotData.mainImage = mainImage
    if (mainImageAlt) newSpotData.mainImageAlt = mainImageAlt
    if (description) newSpotData.description = description
    if (price) newSpotData.price = price
    dispatch(spotActions.editSpot(newSpotData))
    dispatch(spotActions.loadSpot(id))
    setShowEditForm(!showEditForm)
  };

  const deleteSpotSubmit = () => {
    dispatch(spotActions.deleteSpot(id))
    // dispatch(spotActions.loadSpots()); // If i delete this, will it fix the flickering the Bill mentioned...
    redirectHome();
  }

  const submitNewReview = () => {
    const userId = sessionUser.id
    const spotId = id
    const title = reviewTitle
    const rating = reviewRating 
    const description = reviewDescription
    const review = {
      userId, spotId, title, rating, description
    }
    console.log('review spot detaiLs page', review)
    dispatch(reviewActions.newReview(review))
  }

  // TODO what does Name='' do in my inputs? == to className maybe?
  return (
    <>
      {spot && <div className="spot-details-page">
        <img
          className="spot-card-image"
          src={spot.mainImage}
          alt={spot.mainImageAlt}
        />
        <div className='spot-card-title-container'>
          <div className='spot-card-title-container'>
            <h3 className='spot-world'>{spot?.world}</h3>
            <h4 className='spot-location'>{spot?.location}</h4>
          </div>
          <div className='spot-price'>Price: {spot?.price}</div>
        </div>
        <div className="spot-description" placeholder="description" id="spot-description-div" >{spot?.description}</div>
        <div className='button-container'>
          {isOwner && <button id="spot-edit" onClick={e => setShowEditForm(!showEditForm)}>Edit</button>}
          {isOwner && <button onClick={deleteSpotSubmit} id="spot-delete">Delete</button>}
          <button onClick={redirectHome}>Back to Home Page</button>
        </div>
      </div>}
      {showEditForm && isOwner && <form onSubmit={e => {
        e.preventDefault();
        submitChanges();
      }}>
        <input onChange={e => setWorld(e.target.value)} type="text" name="spot-world" placeholder={spot?.world} id="spot-world-input" value={world} />
        <input onChange={e => setLocation(e.target.value)} type="text" name="spot-location" placeholder={spot?.location} id="spot-location-input" value={location} />
        <input onChange={e => setMainImage(e.target.value)} type="text" name="spot-mainImage" placeholder={spot?.mainImage} id="spot-mainImage-input" value={mainImage} />
        <input onChange={e => setMainImageAlt(e.target.value)} type="text" name="spot-mainImageAlt" placeholder={spot?.mainImageAlt} id="spot-mainImageAlt-input" value={mainImageAlt} />
        <input onChange={e => setDescription(e.target.value)} type="text" name="spot-description" placeholder={spot?.description} id="spot-description-input" value={description} />
        <input onChange={e => setPrice(e.target.value)} type="text" name="spot-price" placeholder={spot?.price} id="spot-price-input" value={price} />
        <button id="spot-edit-submit" type='submit' >Submit Edits</button>
      </form>}
      <div className='reviews-container'>
        {reviews && reviews.map(review => {
          return <ReviewCard key={review.id} review={review} />
        })}
      </div>
      <form onSubmit={e => {
        e.preventDefault();
        submitNewReview();
      }}>
        <input onChange={e => setReviewTitle(e.target.value)} type="text" name="review-title" placeholder={'title'} id="review-title-input" value={reviewTitle} />
        <input onChange={e => setReviewRating(e.target.value)} type="text" name="review-rating" placeholder={'rating'} id="review-rating-input" value={reviewRating} />
        <input onChange={e => setReviewDescription(e.target.value)} type="text" name="review-description" placeholder={'description'} id="review-description-input" value={reviewDescription} />
        <button id="new-review-submit" type='submit' >Submit Review</button>
      </form>
    </>
  );
}

export default ProductDetailsPage;