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

export const loadAllDiscussions = () => async (dispatch) => {
  const res = await csrfFetch('/api/discussions')

  if (res.ok) {
    const data = await res.json();
    console.log('data!#!',data)
    dispatch(setDiscussions(data))
  }
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