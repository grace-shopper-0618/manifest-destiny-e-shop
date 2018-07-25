import axios from 'axios'
import history from '../history'

//ACTION TYPES
const SELECT_CATEGORY = 'SELECT_CATEGORY'

//INITIAL STATE
const intialState = {}

//ACTION CREATORS
const selectCategory = (selectedCategory) => ({
  type: SELECT_CATEGORY,
  selectedCategory
})

//THUNK CREATORS
export const setSelectedCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/categories/${categoryId}`)
      dispatch(selectCategory(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//REDUCER
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.selectedCategory
    default:
      return state
  }
}

export default reducer
