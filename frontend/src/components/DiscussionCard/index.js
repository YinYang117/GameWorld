import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import "./DiscussionCard.css";

function DiscussionCard({discussion}) {
  const sessionUser = useSelector(state => state.session.user);
  const [isOwner, setIsOwner] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsOwner(sessionUser?.id === discussion?.userId)
    // console.log('product', product?.ownerId)
    // console.log('sessionUser', sessionUser?.id)
    // console.log('user is owner:', isOwner)
  }, [dispatch]) 
// }, [sessionUser, discussion, isOwner]) 

  return (
    <>
      <div className="discussion-message" >{discussion.message}</div>
    </>
  );
}

export default DiscussionCard;