import axios from 'axios'

const GET_SESSION_CART = 'GET_SESSION_CART'
const ADD_TO_SESSION_CART = 'ADD_TO_SESSION_CART'
const UPDATE_SESSION_CART = 'UPDATE_SESSION_CART'
const DELETE_FROM_SESSION_CART = 'DELETE_FROM_SESSION_CART'
const GUEST_CHECKOUT = 'GUEST_CHECKOUT'

const initialState = []

const getSessionCart = cart => ({
  type: GET_SESSION_CART,
  cart
})

const addToSessionCart = item => ({
  type: ADD_TO_SESSION_CART,
  item
})

const updateSessionCart = item => ({
  type: UPDATE_SESSION_CART,
  item
})

const deleteFromSessionCart = productId => ({
  type: DELETE_FROM_SESSION_CART,
  productId
})

const guestCheckout = () => {
  return {
    type: GUEST_CHECKOUT
  }
}

export const fetchSessionCart = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/users/guest/cart')
      dispatch(getSessionCart(data))
    } catch (err) { console.error(err) }
  }
}

export const addItemToGuestCart = item => {
  // item must have product info (title/id/price), quantity
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/lineitems/guestCart', item)
      dispatch(addToSessionCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateGuestCart = (item, quantity) => {
  return async dispatch => {
    try {
      item.quantity = quantity
      const { data } = await axios.put('/api/lineitems/guestCart', item)
      dispatch(updateSessionCart(data))
    } catch (err) { console.error(err) }
  }
}

export const removeItemFromSessionCart = item => {
  return async dispatch => {
    try {
      const { productId } = item
      await axios.delete(`/api/lineitems/guestCart/${productId}`)
      dispatch(deleteFromSessionCart(productId))
    } catch (err) { console.error(err) }
  }
}

export const checkoutGuestOrder = (finalPrice) => {
  return async dispatch => {
    try {
      await axios.post('/api/orders/guest', {"finalTotal": finalPrice})
      dispatch(guestCheckout())
    } catch (err) { console.error(err) }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSION_CART:
      return action.cart
    case  ADD_TO_SESSION_CART:
      return [...state, action.item]
    case UPDATE_SESSION_CART:
      return state.map(item => item.productId === action.item.productId ? action.item : item)
    case DELETE_FROM_SESSION_CART:
      return state.filter(item => item.productId !== action.productId)
    case GUEST_CHECKOUT:
      return []
    default:
      return state
  }
}

export default reducer
