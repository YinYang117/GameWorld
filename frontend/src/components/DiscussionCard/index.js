import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as discussionActions from '../../store/discussions';
import "./DiscussionCard.css";

function DiscussionCard({discussion}) {
  const sessionUser = useSelector(state => state.session.user);
  const [isOwner, setIsOwner] = useState('');
  const [message, setMesssage] = useState('');
  const dispatch = useDispatch();


  // const allDiscussions = useSelector(state => state.discussions)
  // dispatch(discussionActions.loadProdDiscussions(id))

  useEffect(() => {
    if (sessionUser && discussion) setIsOwner(sessionUser.id === discussion.userId)
    else setIsOwner(false)
  }, [sessionUser]) 

  const submitDiscussionEdits = () => {
    const editedDiscMsg = discussion;
    editedDiscMsg.message = message

    dispatch(discussionActions.editDiscussionMsg(editedDiscMsg))
    
  }

  const deleteDiscussionSubmit = () => {
    const doomedId = discussion.id;
    dispatch(discussionActions.deleteDiscussion(doomedId))

  }

  return (
    <div className="discussion-card-container" >
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
            <input className="discussion-message-edit-input" onChange={e => setMesssage(e.target.value)} type="text-area" placeholder="Edit this Message?" value={message} />
            <button className="discussion-edit-submit" type='submit' >Submit Edits</button>
            {isOwner && <button className="discussion-delete" onClick={deleteDiscussionSubmit} >Delete</button>}
          </form>
      }
      </div>
    </div>
  );
}

export default DiscussionCard;