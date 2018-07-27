import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// INITIAL STATE
const initialState = {
  products: []
  // subtotal: 0
}

// ACTION CREATORS
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

// THUNK CREATORS

// What axios route am I using here? Do I need to write one?
// Wrote route in api/users.js, need to test

export const getCartFromDb = (userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      console.log('cart obejct being added to store', data)
      dispatch(getCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addItemToCart = (item, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/users/${userId}/cart`, item)
      dispatch(addToCart(data))
    } catch (err) {
      console.log(err.message)
    }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return {...state, products: [...state.products, action.item]}
      // , subtotal: state.subtotal + action.item.priceAtCheckout
    default:
      return state
  }
}

export default reducer
