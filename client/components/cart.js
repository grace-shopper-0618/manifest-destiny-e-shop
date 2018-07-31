import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartFromUser, removeItemFromCart, updateLineItem } from '../store/cart'
import { updateGuestCart, removeItemFromSessionCart } from '../store/sessionCart';

class Cart extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
  }

  handleDelete(evt, item) {
    evt.preventDefault()
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      this.props.deleteFromCart(item)
    } else {
      console.log('=== this should run when we hit delete while logged out ===')
      this.props.removeSessionItem(item)
    }
  }

  handleDecrement(evt, item, oldQuantity) {
    evt.preventDefault()
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      this.props.decreaseByOne(item, oldQuantity)
    } else {
      this.props.decreaseSessionCart(item, oldQuantity)
    }
  }

  handleIncrement(evt, item, oldQuantity) {
    evt.preventDefault()
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      this.props.increaseByOne(item, oldQuantity)
    } else {
      this.props.increaseSessionCart(item, oldQuantity)
    }
  }

  render() {
    const { cart, isLoggedIn, guestCart } = this.props
    const lineItems = cart && cart['line-items'] ? cart['line-items'] : guestCart
    const totalPrice = lineItems.reduce((total, item) => {
      return (item.price * item.quantity) + total
    }, 0)
    console.log('==== lineItems ===', lineItems)
    return (
      <div id='shopping-cart'>
        <h3>Your Cart</h3> 
        <ul id='cart-items'>
          {
            lineItems && lineItems.map((item) => {

                return (
                  <div key={item.productId} >
                    <li>
                      <Link to={`/shop/${item.productId}`}>{item.product.title}</Link>
                      <h5>Price: ${item.price}</h5>
                      <h5>Quantity: {item.quantity}</h5>
                    </li>
                    <button onClick={(evt) => this.handleDelete(evt, item)} > Remove from order </button>
                    {
                      item.quantity + 1 <= item.product.inventory ? <button onClick={(evt) => this.handleIncrement(evt, item, item.quantity)}> + </button> : null
                    }
                    {
                      item.quantity - 1 > 0 ? <button onClick={(evt) => this.handleDecrement(evt, item, item.quantity)}> - </button> : null
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
    cart: state.cart.currentOrder,
    isLoggedIn: !!state.user.id,
    guestCart: state.sessionCart
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCart: (user) => {
      dispatch(getCartFromUser(user))
    },
    deleteFromCart: (item) => dispatch(removeItemFromCart(item)),
    increaseByOne: (item, oldQuantity) => {
      dispatch(updateLineItem(item, oldQuantity + 1))
    },
    decreaseByOne: (item, oldQuantity) => {
      dispatch(updateLineItem(item, oldQuantity - 1))
    },
    increaseSessionCart: (item, oldQuantity) => {
      dispatch(updateGuestCart(item, oldQuantity + 1))
    },
    decreaseSessionCart: (item, oldQuantity) => {
      dispatch(updateGuestCart(item, oldQuantity - 1))
    },
    removeSessionItem: (item) => {
      dispatch(removeItemFromSessionCart(item))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
