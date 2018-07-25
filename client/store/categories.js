import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_CATEGORIES = 'GET_CATEGORIES'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories
})

//THUNK CREATORS
export const getProductsFromDb = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/categories')
      dispatch(getCategories(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default reducer
