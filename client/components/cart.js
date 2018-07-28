import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCartFromUser, addItemToCart, removeItemFromCart } from '../store/cart'

class Cart extends Component {

  componentDidMount() {
    const user = this.props.user
    this.props.getCart(user)
    const cart = this.props.cart
    const products = this.props.cart.products
  }

  // handleDelete() { commented out so it won't crash hopefully
  // }

  // handleQuantityChange() {
  // }

  render() {
    const products = this.props.cart.products
    return (
      <div id='shopping-cart'>
        <h3>Your Cart</h3>
        <ul id='cart-items'>
          {
            products.map((product) => {
              if (product['line-item']) {
                return (
                  <li key={product.id}>{product.title}, Price: ${product.price}, Quantity: {product['line-item'].quantity}</li>
                )
              }
            })
          }
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => ({
  getCart: (user) => {
    dispatch(getCartFromUser(user))
  }
})

export default connect(mapState, mapDispatch)(Cart)
