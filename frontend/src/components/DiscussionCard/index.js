import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import * as discussionActions from '../../store/discussions';
import "./DiscussionCard.css";

function DiscussionCard({discussion}) {
  const sessionUser = useSelector(state => state.session.user);
  // const discussionBackup = useSelector(state => state.discussions.id???)
  const [isOwner, setIsOwner] = useState('');
  const [message, setMesssage] = useState(discussion?.message);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsOwner(sessionUser?.id === discussion?.userId)
    console.log('user is owner:', isOwner)
  }, [dispatch]) 
// }, [sessionUser, discussion, isOwner]) 

  const submitDiscussionEdits = () => {
    const editedDiscMsg = discussion;
    editedDiscMsg.message = message

    dispatch(discussionActions.editDiscussionMsg(editedDiscMsg))
    // setShowEditForm(!showEditForm)
  }

  return (
    <>
      <div className="discussion-message" >
        {discussion.message}
      </div>
      <div className="hover-edit">
        {isOwner && 
          <form 
            onSubmit={e => {
            e.preventDefault();
            submitDiscussionEdits();
            }}>
            <input onChange={e => setProductTitle(e.target.value)} type="text" className="product-product-title" placeholder={product?.productTitle} value={productTitle} />
            <input onChange={e => setMainIcon(e.target.value)} type="text" className="product-mainIcon" placeholder={product?.mainIcon} value={mainIcon} />
            <input onChange={e => setMainImage(e.target.value)} type="text" className="product-mainImage" placeholder={product?.mainImage} value={mainImage} />
            <input onChange={e => setMainImageAlt(e.target.value)} type="text" className="product-mainImageAlt" placeholder={product?.mainImageAlt} value={mainImageAlt} />
            <input onChange={e => setDescription(e.target.value)} type="text" className="product-description" placeholder={product?.description} value={description} />
            <button className="product-edit-submit" type='submit' >Submit Edits</button>
          </form>
      }
      </div>
    </>
  );
}

export default DiscussionCard;