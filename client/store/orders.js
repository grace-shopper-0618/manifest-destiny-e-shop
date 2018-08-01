import axios from 'axios'

// ACTION TYPES
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const SHIP_ORDER = 'SHIP_ORDER'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
const getAllOrders = (orders) => ({
  type: GET_ALL_ORDERS,
  orders
})

const shipOrder = (order) => ({
  type: SHIP_ORDER,
  order
})

// THUNK CREATORS
export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/orders')
      dispatch(getAllOrders(data))
    } catch (err) { console.error(err) }
  }
}

export const changeOrderToShipped = (order) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/orders/${order.id}`, { "hasShipped": true })
      dispatch(shipOrder(data))
    } catch (err) { console.error(err) }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    case SHIP_ORDER:
      return state.map(order => order.id !== action.order.id ? order : {...order, hasShipped: true }
      )
    default:
      return state
  }

}

export default reducer
