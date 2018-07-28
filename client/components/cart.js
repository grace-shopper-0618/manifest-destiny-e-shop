import React from 'react'
import { connect } from 'react-redux'
import { getCartFromDb, addItemToCart, removeItemFromCart } from '../store/cart'
//I'm importing addItemToCart and adding a route for removeItemFromCart 
//so we can increment and decrement quantity 

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            lineItems: [],
            userId: 0
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.id
        const cart = this.props.getCart(userId)
        console.log('cart', cart)
        try {
            this.setState(cart.lineItems)
        } catch {
            console.log("Couldn't find any line items")
        }
    }

    // handleDelete() { commented out so it won't crash hopefully

    // }

    // handleQuantityChange() {

    // }

    render() {
        const lineItems = this.state.lineItems
        const userId = this.state.userId
        return (
            <div id='shopping-cart'>
                <h3>Your Cart</h3>
                <ul id='cart-items'>
                    {
                        lineItems.map((lineItem) => {
                            return (
                                <li key={lineItem.id}>{lineItem.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

// const mapState = (state) => {

// }

const mapDispatch = (dispatch) => ({
    getCart: (id) => {
        dispatch(getCartFromDb(id))
    }
})


export default connect(null, mapDispatch)(Cart)
