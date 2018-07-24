import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products
})

//THUNK CREATORS

//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products
        default: 
            return state
    }
}

export default reducer
