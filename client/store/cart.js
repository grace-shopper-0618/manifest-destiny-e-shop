import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART' //updates line item quantity - rename?
const GET_USER_ORDERS = 'GET_USER_ORDERS'
const UPDATE_ADDRESS = 'UPDATE_ADDRESS'


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

const updateAddress = address => ({
  type: UPDATE_ADDRESS,
  address
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

// export const getCartFromSession = () => {
// }


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

export const updateAddressinDb = (address, orderId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/${orderId}`, address)
      dispatch(updateAddress(address))
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
    case UPDATE_ADDRESS:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          shippingAddress: action.address
        }

      }
    default:
      return state
  }
}

export default reducer
