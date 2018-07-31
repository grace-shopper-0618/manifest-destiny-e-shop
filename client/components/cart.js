import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartFromUser, removeItemFromCart, updateLineItem } from '../store/cart'

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
    const totalPrice = lineItems.reduce((total, item) => {
      return (item.product.price * item.quantity) + total
    }, 0)

    const { increaseByOne, decreaseByOne } = this.props
    return (
      <div id='shopping-cart'>
        <h3>Your Cart</h3>
        <ul id='cart-items'>
          {
            lineItems && lineItems.map((item) => {

              return (
                <div key={item.productId} >
                  <li>
                    <Link to={`/shop/${item.product.id}`}>{item.product.title}</Link>
                    <h5>Price: ${item.product.price}</h5>
                    <h5>Quantity: {item.quantity}</h5>
                  </li>
                  <button onClick={(evt) => this.handleDelete(evt, item)} > Remove from order </button>
                  {
                    item.quantity + 1 <= item.product.inventory ? <button onClick={(evt) => increaseByOne(evt, item, item.quantity)}> + </button> : null
                  }
                  {
                    item.quantity - 1 > 0 ? <button onClick={(evt) => decreaseByOne(evt, item, item.quantity)}> - </button> : null
                  }
                </div>
              )

            })
          }
        </ul>
        <h4>Total Price: ${totalPrice}</h4>
        <Link to='/checkout/address'>Proceed to Checkout</Link>
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
    increaseByOne: (evt, item, oldQuantity) => {
      evt.preventDefault()
      dispatch(updateLineItem(item, oldQuantity + 1))
    },
    decreaseByOne: (evt, item, oldQuantity) => {
      evt.preventDefault()
      dispatch(updateLineItem(item, oldQuantity - 1))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
