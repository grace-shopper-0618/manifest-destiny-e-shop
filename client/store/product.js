import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_PRODUCT = 'GET_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const NEW_REVIEW_FOR_PRODUCT = 'NEW_REVIEW_FOR_PRODUCT'

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

const newReviewForProduct = (review) => ({
  type: NEW_REVIEW_FOR_PRODUCT,
  review
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
    } catch (err) { console.error(err) }
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

export const submitNewReview = (reviewBody, productId, userId) => {
  return async dispatch => {
    console.log('ReviewBody:', reviewBody)
    const newReview = { ...reviewBody, productId, userId }
    const { data } = await axios.post(`/api/products/${productId}/reviews`, newReview)
    dispatch(newReviewForProduct(data))
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case EDIT_PRODUCT:
      return action.product
    case NEW_REVIEW_FOR_PRODUCT:
      return {
        ...state,
        reviews: [...state.reviews, action.review]
      }
    default:
      return state
  }
}

export default reducer
