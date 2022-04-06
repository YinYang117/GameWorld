// import { csrfFetch } from './csrf';

// const LOAD_PRODUCTS = 'products/loadProducts';
// const LOAD_PRODUCT = 'products/loadProduct';

// // CONSTANTS display text in actions log
// /////////////////////////////////////////
// // action creators

// const setProducts = (products) => {
//   return {
//     type: LOAD_PRODUCTS,
//     payload: products,
//   };
// };

// const setProduct = (product) => {
//   return {
//     type: LOAD_PRODUCT,
//     payload: product,
//   };
// }; 


// // products
// // Products
// // PRODUCTs
// /////////////////////////////////////////
// // thunks return a function that returns an action

// export const loadProducts = () => async (dispatch) => {
//   const res = await csrfFetch('/api/products')
//   const data = await res.json();
//   const loadedProducts = {};

//   data.products.forEach(product => loadedProducts[product.id] = product);
//   dispatch(setProducts(loadedProducts))
// }

// // export const loadProduct = (id) => async (dispatch) => {
// //   const res = await csrfFetch(`/api/products/${id}`)
// //   const data = await res.json();
// //   console.log('load single product in store', data)
// //   dispatch(setProduct(data))
// // }

// export const newProduct = (newProduct) => async (dispatch) => {
//   const { ownerId, productTitle, mainImage, mainImageAlt, description } = newProduct
//   const res = await csrfFetch('/api/products/new', {
//       method: 'POST',
//       body: JSON.stringify({ ownerId, productTitle, mainImage, mainImageAlt, description }),
//   })
//   const data = await res.json();
//   console.log('new product in store', data)
//   dispatch(setProduct(data))
// }

// // Dont allow custom ownerId, aka dont let owner change ownership
// export const editProduct = (editedProduct) => async (dispatch) => {
//   const { ownerId, productTitle, mainImage, mainImageAlt, description } = editedProduct
//   const res = await csrfFetch(`/api/products/${editedProduct.id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ ownerId, productTitle, mainImage, mainImageAlt, description }),
//     })
//   const data = await res.json();
//   console.log('data from editproduct in store', data)
//   dispatch(setProduct(data))
// }

// export const deleteProduct = (id) => async (dispatch) => {
//   await csrfFetch(`/api/products/${id}`, { method: 'DELETE' })
//   dispatch(setProducts({}));
// }

// // end of thunks
// /////////////////////////////////////////
// // reducer

const initState = {};

const discussionsReducer = (state = initState, action) => {
  //// let newState = { ...state };
  // let newState = Object.assign({}, state);
  switch (action.type) {
    // case LOAD_PRODUCTS:
    //   newState.products = [...state.products, ...action.payload]
    //   return newState;
    // case LOAD_PRODUCT:
    //   newState.products[action.payload.id] = action.payload
    //   return newState;
    default:
      return state;
  }
}

export default discussionsReducer;