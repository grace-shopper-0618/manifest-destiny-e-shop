import axios from 'axios'
import history from '../history'
import { EDIT_PRODUCT } from './product'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products
})

const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId
})

//THUNK CREATORS
export const getProductsFromDb = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeProductFromDb = (productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products
        case DELETE_PRODUCT:
            return state.filter(product => product.id !== action.productId)
        case EDIT_PRODUCT:
            return state.filter(product => {
              return product.id === action.product.id ? action.product : product
            })
        default:
            return state
    }
}

export default reducer
