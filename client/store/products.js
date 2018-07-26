import axios from 'axios'
import history from '../history'
import { EDIT_PRODUCT } from './product'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
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

export const addProductToState = (product, historyProp) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(addProduct(data))
      historyProp.push(`/shop/${product.id}`)
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeProductFromDb = (productId, historyProp) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
      historyProp.push('/products') // so we return to the all products view after deleting
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
        case ADD_PRODUCT:
            return [...state, action.product]
        case DELETE_PRODUCT:
            return action.products.filter(product => product.id !== action.productId)
        case EDIT_PRODUCT:
            // action creator and thunk for this are in product.js
            return action.products.filter(product => {
              return product.id === action.product.id ? action.product : product
            })
        default:
            return state
    }
}

export default reducer
