import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'
const GET_PRICE = 'GET_PRICE'

// INITIAL STATE
const initialState = {
  products: [],
  totalPrice: 0
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

const deleteFromCart = lineItem => ({
  type: DELETE_FROM_CART,
  id: lineItem.productId
})

const updateCart = (item) => ({
  type: UPDATE_CART,
  item
})

const getPrice = (price) => ({
  type: GET_PRICE,
  price
})

// THUNK CREATORS

// What axios route am I using here? Do I need to write one?
// Wrote route in api/users.js, need to test

export const getCartFromUser = (user) => {
  return async dispatch => {
    try {
      console.log('===', user)
      const id = user.orders[0].id // id of the active cart for this user
      const { data } = await axios.get(`/api/orders/${id}`)
      console.log('***cart obejct being added to store', data)
      dispatch(getCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

// export const getCartFromSession = () => {

// }

export const addItemToCart = (item, user) => {
  return async dispatch => {
    try {
      const id = user.orders[0].id
      const { data } = await axios.post(`/api/orders/${id}/`, item)
      dispatch(addToCart(data))
    } catch (err) {
      console.log(err.message)
    }
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
      const { orderId, productId } = item['line-item']
      // line item quantity gets updated in the database
      const updatedLineItem = await axios.put(`/${orderId}/${productId}`, quantity)
      // product item object gets updated in the store
      item['line-item'].quantity = quantity
      dispatch(updateCart(item))
    } catch (err) { console.error(err.message) }
  }
}

export const getTotalPrice = (orderId) => {
  return async dispatch => {
    try {
      const totalPrice = await axios.get(`/api/orders/${orderId}/total`)
      console.log('just got total price for order', totalPrice)
      dispatch(getPrice(totalPrice))
    } catch (err) { console.error(err.message) }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {...state, ...action.cart}
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.item]
      }
    case DELETE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.id)
      }
    case GET_PRICE:
      return {
        ...state,
        totalPrice: action.price
      }
    default:
      return state
  }
}

export default reducer
