import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_PRODUCT = 'GET_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'

// INITIAL STATE
const initialState = {}

// ACTION CREATORS
export const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

const editProduct = product => ({
  type: EDIT_PRODUCT,
  product
})

// THUNK CREATORS
export const getProductFromDb = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const editProductInDb = (product, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, product)
      dispatch(editProduct(data))
      history.push(`/shop/${id}`)
    } catch (error) {
      console.error(error)
    }
  }
}

export const addCategoryToProduct = (productId, category) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/products/${productId}/categories`, category)
      dispatch(editProduct(data))
    } catch (err) { console.error(err)}
  }
}

export const deleteCategoryFromProduct = (productId, categoryId) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}/categories/${categoryId}`)
      dispatch(editProduct(data))

    } catch (err) {
      console.error(err)
    }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case EDIT_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default reducer
