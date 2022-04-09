import { csrfFetch } from './csrf';

const LOAD_PRODUCTS = 'products/loadProducts';
const ADD_PRODUCT = 'products/loadProduct';
const DELETE_PRODUCT = 'products/deleteProduct';

// CONSTANTS display text in actions log
/////////////////////////////////////////
// action creators
// actions are just objects

const setProducts = (products) => {
  return {
    type: LOAD_PRODUCTS,
    payload: products,
  };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}; 

const removeProduct = (id) => {
  return { 
    type: DELETE_PRODUCT,
    payload: id,
  };
}; 

/////////////////////////////////////////
// thunks return a function that returns an action

export const loadProducts = () => async (dispatch) => {
  const res = await csrfFetch('/api/products')

  if (res.ok) {
    const data = await res.json();
    const loadedProducts = {};
    data.forEach(product => loadedProducts[product.id] = product);
    dispatch(setProducts(loadedProducts))
  }
}

export const loadProduct = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/products/${id}`)

  if (res.ok) {
    const data = await res.json();
    dispatch(addProduct(data))
  }
}

export const newProduct = (newProduct) => async (dispatch) => {
  const { ownerId, productTitle, mainIcon, mainImage, mainImageAlt, description } = newProduct
  const res = await csrfFetch('/api/products/new', {
      method: 'POST',
      body: JSON.stringify({ ownerId, productTitle, mainIcon, mainImage, mainImageAlt, description }),
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(addProduct(data))
  }
}

// Dont allow custom ownerId, aka dont let owner change ownership
export const editProduct = (editedProduct) => async (dispatch) => {
  const { ownerId, productTitle, mainIcon, mainImage, mainImageAlt, description } = editedProduct
  const res = await csrfFetch(`/api/products/${editedProduct.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ownerId, productTitle, mainIcon, mainImage, mainImageAlt, description }),
    })
  const data = await res.json();
  dispatch(addProduct(data))
}

export const deleteProduct = (id) => async (dispatch) => {
  await csrfFetch(`/api/products/${id}`, { method: 'DELETE' })
  dispatch(removeProduct(id));
}

// end of thunks
/////////////////////////////////////////
// reducer

const initState = {};

const productsReducer = (state = initState, action) => {
  // let newState = { ...state }; // same as below
  let newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_PRODUCTS:
      newState = action.payload
      return newState;
    case ADD_PRODUCT:
      newState[action.payload.id] = action.payload
      return newState;
    case DELETE_PRODUCT:
      delete newState[action.payload]
      return newState
      // return newState.products.fiter(product => product.id !== action.payload)
    default:
      return state;
  }
}

export default productsReducer;