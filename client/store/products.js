import axios from 'axios'
import history from '../history'
import { EDIT_PRODUCT } from './product'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

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

const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId
  }
}

const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product
})

//THUNK CREATORS
export const getProductsFromDb = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}


export const addProductToState = (product) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/products', product)
      dispatch(addProduct(data))
      history.push(`/shop/${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeProductFromDb = (productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
      history.push('/shop')
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProductInDb = (productUpdate, productId) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, productUpdate)
      dispatch(updateProduct(data))
    } catch (error) { console.error(error) }
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
      return state.filter(product => product.id !== action.productId)
    case EDIT_PRODUCT:
      return state.filter(product => {
        return product.id === action.product.id ? action.product : product
      })
    case UPDATE_PRODUCT:
      return state.map(product => product.id === action.product.id ? action.product : product)
    default:
      return state
  }
}

export default reducer
