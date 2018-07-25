import axios from 'axios'
import history from '../history'

//ACTION TYPES
const SELECT_CATEGORY = 'SELECT_CATEGORY'
const DESELECT_CATEGORY = 'DESELECT_CATEGORY'

//INITIAL STATE
const intialState = {}

//ACTION CREATORS
const selectCategory = (selectedCategory) => ({
  type: SELECT_CATEGORY,
  selectedCategory
})

export const deselectCategory = () => {
  return {
    type: DESELECT_CATEGORY
  }
}

//THUNK CREATORS
export const setSelectedCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      console.log('id', categoryId)
      const {data} = await axios.get(`/api/categories/${categoryId}`)
      console.log('category', data)
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
    case DESELECT_CATEGORY:
      return {}
    default:
      return state
  }
}

export default reducer
