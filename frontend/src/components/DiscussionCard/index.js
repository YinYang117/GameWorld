import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import * as discussionActions from '../../store/discussions';
import "./DiscussionCard.css";

function DiscussionCard({discussion}) {
  const sessionUser = useSelector(state => state.session.user);
  // const discussionBackup = useSelector(state => state.discussions.id???)
  const [isOwner, setIsOwner] = useState('');
  // const [discussion, setDiscussion] = useState(discussion)
  const [message, setMesssage] = useState('');
  // const [message, setMesssage] = useState(discussion?.message);
  const history = useHistory();
  const dispatch = useDispatch();


  // const allDiscussions = useSelector(state => state.discussions)
  // dispatch(discussionActions.loadProdDiscussions(id))

  useEffect(() => {
    setIsOwner(sessionUser?.id === discussion?.userId)
  }, [dispatch]) 
// }, [sessionUser, discussion, isOwner]) 

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
            <input onChange={e => setMesssage(e.target.value)} type="text" className="discussion-message-edit-input" placeholder="New Discussion Message?" value={message} />
            <button className="discussion-edit-submit" type='submit' >Submit Edits</button>
            {isOwner && <button id="product-delete" onClick={deleteDiscussionSubmit} >Delete</button>}
          </form>
      }
      </div>
    </>
  );
}

export default DiscussionCard;