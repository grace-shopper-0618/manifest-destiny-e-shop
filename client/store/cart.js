import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const DECREMENT_FROM_CART = 'DECREMENT_FROM_CART'

// INITIAL STATE
const initialState = {
  lineItems: []
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

const deleteFromCart = item => ({
  type: DELETE_FROM_CART,
  item
})

const decrementFromCart = userId => ({
  type: DECREMENT_FROM_CART,
  userId
})

// THUNK CREATORS

// What axios route am I using here? Do I need to write one?
// Wrote route in api/users.js, need to test

export const getCartFromDb = (userId) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/cart`)
      console.log('cart object being added to store')
      dispatch(getCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addItemToCart = (item, userId) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/cart`, item)
      dispatch(addToCart(data))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const removeItemFromCart = (item, userId) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/users/${userId}/cart`, item)
      if (data) {
        dispatch(decrementFromCart(userId))
      }
      dispatch(deleteFromCart(data))
    } catch (err) {
      console.log(err.message)
    }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {...state, lineItems: [...action.cart.lineItems]}
      // to update the subtotal we're going to need to calculate
      // it in the action creator or thunk creator and send it here
    case ADD_TO_CART:
      return {...state, products: [...state.products, action.item]}
      // , subtotal: state.subtotal + action.item.priceAtCheckout
    case DELETE_FROM_CART:
      return {...state, lineItems: [...state.lineItems]}
      // this is tricky... we need to get the array index of the 
      // line item we want to delete. maybe we can
      // use the action creator to copy the state
      // and send it to the reducer on the action
    case DECREMENT_FROM_CART:
      return {...state, lineItems: [...state.lineItems]}
      // again, I think we need to update the lineItems array on 
      // state before we get to the reducer
    default:
      return state
  }
}

export default reducer
