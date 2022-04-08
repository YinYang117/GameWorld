import { csrfFetch } from './csrf';

const LOAD_DISCUSSIONS = 'discussions/load_discussions';
const LOAD_DISCUSSION = 'discussions/load_discussion';
const DELETE_DISCUSSION = 'discussions/delete_discussion';

// // CONSTANTS display text in actions log
// /////////////////////////////////////////
// // action creators

const setDiscussions = (discussions) => {
  return {
    type: LOAD_DISCUSSIONS,
    payload: discussions,
  }
}

const addDiscussion = (discussion) => {
  return {
    type: LOAD_DISCUSSION,
    payload: discussion,
  }
}

const removeDiscussion = (id) => {
  return { 
    type: DELETE_DISCUSSION,
    payload: id,
  };
}; 

// !#!#!#!#!#!#!
// Im going to normalize data in these Discussions in the cases below
// compared to products

export const newDiscussion = (newDiscussion) => async (dispatch) => {
  const { userId, productId, message } = newDiscussion
  const res = await csrfFetch('/api/discussions/new', {
      method: 'POST',
      body: JSON.stringify({ userId, productId, message }),
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(addDiscussion(data))
  }
}

export const loadAllDiscussions = () => async (dispatch) => {
  const res = await csrfFetch('/api/discussions')

  if (res.ok) {
    const data = await res.json();
    dispatch(setDiscussions(data))
  }
}

export const loadProdDiscussions = (ProdId) => async (dispatch) => {
  const res = await csrfFetch(`/api/discussions/product/${ProdId}`)
  if (res.ok) {
    const data = await res.json();
    dispatch(setDiscussions(data))
  }
}

export const editDiscussionMsg = (editedDiscMsg) => async (dispatch) => {
  const { id, message } = editedDiscMsg
  const res = await csrfFetch(`/api/discussions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ message }),
    })
  const data = await res.json();
  dispatch(addDiscussion(data))
}

export const deleteDiscussion = (id) => async (dispatch) => {
  await csrfFetch(`/api/discussions/${id}`, { method: 'DELETE' })
  dispatch(removeDiscussion(id));
}

// normalize data here for these, vs the products page.
const initState = {};
const discussionsReducer = (state = initState, action) => {
  //// let newState = { ...state };
  // let newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_DISCUSSIONS:
      const objDiscussions = {};
      action.payload.forEach(dis => objDiscussions[dis.id] = dis);
      return {...state, ...objDiscussions}
    default:
      return state;
  }
}

export default discussionsReducer;