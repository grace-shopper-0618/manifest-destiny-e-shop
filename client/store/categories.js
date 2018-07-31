import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories
})

const addCategory = (category) => ({
  type: ADD_CATEGORY,
  category
})

//THUNK CREATORS
export const getCategoriesFromDb = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/categories')
      dispatch(getCategories(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const submitNewCategory = (category) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/categories', category)
      // we are getting our data here
      dispatch(addCategory(data))
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
    // case ADD_CATEGORY:
    //   console.log('past categories', state.categories, 'new addition', action.category)
    //   return [...state.categories, action.category]
    default:
      return state
  }
}

export default reducer
