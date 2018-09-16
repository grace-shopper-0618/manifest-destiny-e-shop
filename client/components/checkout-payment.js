import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'
import { getCartFromOrderId, updateOrderinDb, getCartFromUser } from '../store/cart'
import { updateProductInDb } from '../store/products';
import { checkoutGuestOrder } from '../store/sessionCart';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    }
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault()
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) this.setState({
      complete: true
    })

    if (this.props.isLoggedIn) {

      const updates = {
        isActiveCart: false,
        finalTotal: this.props.cart.total
      }

      const lineItems = this.props.cart['line-items']
      lineItems.forEach(item => {
        const inStock = item.product.inventory
        const numOrdered = item.quantity
        const productUpdates = {
          "inventory": inStock - numOrdered
        }
        this.props.updateProductInventory(productUpdates, item.productId)
      })

      this.props.orderCheckout(updates, this.props.cart.id)
    } else {
      const total = this.props.guestCart.reduce((acc, item) => {
        return acc + (item.quantity * item.price)
      }, 0)

      this.props.submitGuestOrder(total)
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn) this.props.fetchUserCart(this.props.cart.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart.isActiveCart !== this.props.cart.isActiveCart) {
      this.props.fetchNewUserCart(this.props.user.id)
    }

  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>

    const cart = this.props.cart
    let total;
    if (this.props.isLoggedIn) {
      total = cart.total ? cart.total : null
    } else {
      total = this.props.guestCart.reduce((acc, item) => {
        return acc + (item.quantity * item.price * 100)
      }, 0)
    }

    return (
      <div className="page-left">
        <h2>Cart Total: ${total}</h2>
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button type="submit" onClick={this.submit}>Send</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return ({
    cart: state.cart.currentOrder,
    user: state.user,
    isLoggedIn: !!state.user.id,
    guestCart: state.sessionCart
  })
}

const mapDispatch = dispatch => {
  return {
    fetchUserCart: (orderId) => dispatch(getCartFromOrderId(orderId)),
    orderCheckout: (updates, orderId) => dispatch(updateOrderinDb(updates, orderId)),
    fetchNewUserCart: (userId) => dispatch(getCartFromUser(userId)),
    updateProductInventory: (productUpdate, productId) => dispatch(updateProductInDb(productUpdate, productId)),
    submitGuestOrder: (finalPrice) => dispatch(checkoutGuestOrder(finalPrice))
  }
}

const CheckoutFormWithStripe = injectStripe(CheckoutForm)
export default connect(mapState, mapDispatch)(CheckoutFormWithStripe)
