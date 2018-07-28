import axios from 'axios'
import history from '../history'

// ACTIONS
const GET_USER_ORDERS = 'GET_USER_ORDERS'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
const getUserOrders = orders => ({
  type: GET_USER_ORDERS,
  orders
})

// THUNK CREATORS
export const getUserOrdersFromDb = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/orders`)
      dispatch(getUserOrders(data))
    } catch (err) {
      console.err(err.message)
    }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default reducer
