import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART' //updates line item quantity - rename?
const GET_USER_ORDERS = 'GET_USER_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER' // for admin to update order properties


// INITIAL STATE
const initialState = {
  currentOrder: {},
  pastOrders: []
}

// ACTION CREATORS
const getCart = cart => ({
  type: GET_CART,
  cart
})

const getUserOrders = orders => ({
  type: GET_USER_ORDERS,
  orders
})

const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

const deleteFromCart = item => ({
  type: DELETE_FROM_CART,
  item
})

const updateCart = item => ({
  type: UPDATE_CART,
  item
})

const updateOrder = order => ({
  type: UPDATE_ORDER,
  order
})

// THUNK CREATORS

// What axios route am I using here? Do I need to write one?
// Wrote route in api/users.js, need to test

export const getCartFromUser = (userId) => {
  return async dispatch => {
    try {

      const { data } = await axios.get(`/api/users/${userId}/orders`) // return cart with line-items
      const activeOrder = data.find(order => order.isActiveCart)
      dispatch(getCart(activeOrder))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getCartFromOrderId = (orderId) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`)
      dispatch(getCart(data))
    } catch (err) { console.log(err) }
  }
}

export const removeItemFromCart = (lineItem) => {
  return async dispatch => {
    try {
      const { orderId, productId } = lineItem
      await axios.delete(`/api/lineitems/${orderId}/${productId}`)
      dispatch(deleteFromCart(lineItem))
    } catch (err) { console.error(err.message) }

  }
}

export const updateLineItem = (item, quantity) => {
  return async dispatch => {
    try {
      const { orderId, productId } = item
      const { data } = await axios.put(`/api/lineitems/${orderId}/${productId}`, { "quantity": quantity })
      dispatch(updateCart(data))
    } catch (err) { console.error(err.message) }
  }
}

export const addItemToCart = (item) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/lineitems/${item.orderId}/`, item)
      dispatch(addToCart(data))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const getUserOrdersFromDb = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/orders`)

      const pastOrders = data.filter(order => !order.isActiveCart)
      dispatch(getUserOrders(pastOrders))
    } catch (err) {
      console.error(err.message)
    }
  }
}

//use to update orders in db - need to send full order object
export const updateOrderinDb = (updates, orderId) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}`, updates)
      dispatch(updateOrder(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, currentOrder: action.cart }
    case ADD_TO_CART:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          'line-items': [...state.currentOrder['line-items'], action.item]
        }
      }
    case DELETE_FROM_CART:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          'line-items': state.currentOrder['line-items'].filter(item => item.productId !== action.item.productId)
        }
      }
    case GET_USER_ORDERS:
      return {
        ...state,
        pastOrders: action.orders
      }
    case UPDATE_CART:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          'line-items': state.currentOrder['line-items'].map(item => item.productId === action.item.productId ? action.item : item)
        }
      }
    case UPDATE_ORDER:
      return {
        ...state,
        currentOrder: action.order
      }
    default:
      return state
  }
}

export default reducer
