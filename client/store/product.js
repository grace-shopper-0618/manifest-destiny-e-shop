import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_PRODUCT = 'GET_PRODUCT'

// INITIAL STATE
const initialState = {}

// ACTION CREATORS
export const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

// THUNK CREATORS

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default reducer