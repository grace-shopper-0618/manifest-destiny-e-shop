import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateOrderinDb } from '../store/cart'
import axios from 'axios'

class CheckoutAddress extends Component {
  constructor() {
    super()
    this.state = {
      shippingAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      }
      // summerPromo: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    evt.preventDefault()

    this.setState({
      shippingAddress: { ...this.state.shippingAddress, [evt.target.name]: evt.target.value },
      // summerPromo: evt.target.summerPromo
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const { isLoggedIn } = this.props
    const shippAd = this.state.shippingAddress
    const concatAddress = `${shippAd.firstName} ${shippAd.lastName} ${shippAd.address1} ${shippAd.address2} ${shippAd.city}, ${shippAd.state} ${shippAd.zip}`
    if (isLoggedIn) {
      const updatedOrder = { ...this.props.cart, shippingAddress: concatAddress }
      this.props.submitAddress(updatedOrder, updatedOrder.id)
    } else {
      await axios.put('/api/users/guest/cart', { "concatAddress": concatAddress })
      // promocode?
    }
    this.props.history.push('/checkout/payment')
  }

  render() {
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit
    return (
      <div className="page-left" >
        <h3>Shipping Address:</h3>
        <form id="shipping-address" onSubmit={handleSubmit}>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input name='firstName' type='string' onChange={handleChange} value={this.state.shippingAddress.firstName} required />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input name='lastName' type='string' onChange={handleChange} value={this.state.shippingAddress.lastName} required />
          </div>
          <div>
            <label htmlFor='address1'>Address</label>
            <input name='address1' type='text' onChange={handleChange} value={this.state.shippingAddress.address1} required />
          </div>
          <div>
            <label htmlFor='address2'>Address 2</label>
            <input name='address2' type='text' onChange={handleChange} value={this.state.shippingAddress.address2} />
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <input name='city' type='string' onChange={handleChange} value={this.state.shippingAddress.city} required />
          </div>
          <div>
            <label htmlFor='state'>State</label>
            <input name='state' type='string' onChange={handleChange} value={this.state.shippingAddress.state} required />
          </div>
          <div>
            <label htmlFor='zip'>ZIP Code</label>
            <input name='zip' type='string' onChange={handleChange} value={this.state.shippingAddress.zip} required />
          </div>
          {/* <div>
            <label htmlFor='promo'>Promo Code</label>
            <input name='promo' type='string' onChange={handleChange} value={this.state.summerPromo} />
          </div> */}
          <div>
            <button type='submit'>Continue Checkout</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return ({
    cart: state.cart.currentOrder,
    address: state.cart.shippingAddress,
    user: state.user,
    isLoggedIn: !!state.user.id
  })
}

const mapDispatch = dispatch => {
  return {
    submitAddress: (updatedOrder, orderId) => {
      dispatch(updateOrderinDb(updatedOrder, orderId))
    }
  }
}

export default connect(mapState, mapDispatch)(CheckoutAddress)
