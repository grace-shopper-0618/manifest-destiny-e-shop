import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartFromUser, addItemToCart, removeItemFromCart, getTotalPrice } from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(evt, item) {
    evt.preventDefault()
    this.props.deleteFromCart(item)
  }

  render() {
    const cart = this.props.cart
    const lineItems = cart['line-items'] ? cart['line-items'] : []

    return (
      <div id='shopping-cart'>
        <h3>Your Cart</h3> 
        <ul id='cart-items'>
          {
            lineItems && lineItems.map((item) => {

                return (
                  <div key={item.productId} >
                    <li>
                      {item.product.title}, Price: ${item.product.price}, Quantity: {item.quantity}
                    </li>
                    <button onClick={(evt) => this.handleDelete(evt, item)} > Remove from order </button>

                  </div>
                )

            })
          }
        </ul>
        <Link to='/checkout'>Proceed to Checkout</Link>
        {/* <h4> Total price: ${this.props.cart.totalPrice} </h4> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart.currentOrder
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCart: (user) => {
        dispatch(getCartFromUser(user))
    },
    deleteFromCart: (item) => dispatch(removeItemFromCart(item)),
    fetchTotalPrice: (orderId) => dispatch(getTotalPrice(orderId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
