import React, { Component } from 'react'
import { connect } from 'react-redux'
<<<<<<< HEAD
import { updateAddressinDb } from '../store/cart'
import { Link } from 'react-router-dom'

class CheckoutAddress extends Component {
  constructor() {
    super()
    this.state = {
      // cartId: 0,
      shippingAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({
      shippingAddress: { [evt.target.name]: evt.target.value }
    })

    // const firstName = evt.target.firstName
    // const lastName = evt.target.lastName
    // const address1 = evt.target.address1
    // const address2 = evt.target.address2
    // const city = evt.target.city
    // const state = evt.target.state
    // const zip = evt.target.zip
    // this.setState({
    //   shippingAddress: {
    //     firstName,
    //     lastName,
    //     address1,
    //     address2,
    //     city,
    //     state,
    //     zip
    //   }
    // })
    console.log(this.state.shippingAddress)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log(this.state)
    this.props.submitAddress(this.state.shippingAddress, this.props.cart.id)
  }

  // componentDidMount() {
  //   console.log('cart in CDM:', this.props.cart)
  //   const cartId = this.props.cart.id
  //   console.log('cartId in CDM props: ', this.props.cart.id)
  //   // this.setState({ cartId })
  //   // console.log('cartId in CDM state: ', this.state.cartId)
  // }

  render() {
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit
    return (
      <div id='checkout-form'>
        <h3>Shipping Address:</h3>
        <form id="shipping-address" onSubmit={handleSubmit}>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input name='firstName' type='string' onChange={handleChange} value={this.state.shippingAddress.firstName} />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input name='lastName' type='string' onChange={handleChange} value={this.state.shippingAddress.lastName} />
          </div>
          <div>
            <label htmlFor='address1'>Address</label>
            <input name='address1' type='text' onChange={handleChange} value={this.state.shippingAddress.address1} />
          </div>
          <div>
            <label htmlFor='address2'>Address</label>
            <input name='address2' type='text' onChange={handleChange} value={this.state.shippingAddress.address2} />
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <input name='city' type='string' onChange={handleChange} value={this.state.shippingAddress.city} />
          </div>
          <div>
            <label htmlFor='state'>State</label>
            <input name='state' type='string' onChange={handleChange} value={this.state.shippingAddress.state} />
          </div>
          <div>
            <label htmlFor='zip'>ZIP Code</label>
            <input name='zip' type='string' onChange={handleChange} value={this.state.shippingAddress.zip} />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
        <h3>Current Shipping Address:</h3>
        <div id='display-address'>
          <p>{this.state.firstName} {this.state.lastName}</p>
          <p>{this.state.address1}</p>
          <p>{this.state.address2}</p>
          <p>{this.state.city}, {this.state.state} {this.state.zip}</p>
          <Link to='/checkout-payment'>Confirm Shipping Address and Continue to Credit Card Details</Link>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return ({
    cart: state.cart.currentOrder
  })
}

const mapDispatch = dispatch => {
  return {
    submitAddress: (shippingAddress, orderId) => {
      dispatch(updateAddressinDb(shippingAddress, orderId))
    }
  }
}

export default connect(mapState, mapDispatch)(CheckoutAddress)
=======
import { setShippingAddress } from '../store/cart'
import { Link } from 'react-router-dom'

class CheckoutAddress extends Component {
    constructor() {
        super() 
        this.state = {
            cartId: 0,
            shippingAddress: {
                firstName: '',
                lastName: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: ''
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt) {
        evt.preventDefault()
        const firstName = evt.target.firstName
        const lastName = evt.target.lastName
        const address1 = evt.target.address1
        const address2 = evt.target.address2
        const city = evt.target.city
        const state = evt.target.state
        const zip = evt.target.zip
        this.setState({
            shippingAddress: {
                firstName, 
                lastName, 
                address1, 
                address2, 
                city, 
                state,
                zip
            }
        })
    }

    handleSubmit(evt) {
        evt.preventDefault()
        this.props.submitAddress(this.state.shippingAddress, this.state.orderId)
    }

    componentDidMount() {
        console.log('cart:', this.props.cart)
        const cartId = this.props.cart.id
        this.setState({cartId})
        console.log('cartId: ', this.state.cartId)
    }

    render() {
        const handleChange = this.handleChange
        const handleSubmit = this.handleSubmit
        return (
            <div id='checkout-form'>
                <h3>Shipping Address:</h3>
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <div>
                        <label htmlFor='firstName'>First Name</label>
                        <input name='firstName' type='string' />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                        <input name='lastName' type='string' />
                    </div>
                    <div>
                        <label htmlFor='address1'>Address</label>
                        <input name='address1' type='text' />
                    </div>
                    <div>
                        <label htmlFor='address2'>Address</label>
                        <input name='address2' type='text' />
                    </div>
                    <div>
                        <label htmlFor='city'>City</label>
                        <input name='city' type='string' />
                    </div>
                    <div>
                        <label htmlFor='state'>State</label>
                        <input name='state' type='string' />
                    </div>
                    <div>
                        <label htmlFor='zip'>ZIP Code</label>
                        <input name='zip' type='string' />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
                <h3>Current Shipping Address:</h3>
                <div id='display-address'>
                    <p>{this.state.firstName} {this.state.lastName}</p>
                    <p>{this.state.address1}</p>
                    <p>{this.state.address2}</p>
                    <p>{this.state.city}, {this.state.state} {this.state.zip}</p>
                    <Link to='/checkout-payment'>Confirm Shipping Address & Continue to Credit Card Details</Link>
                </div>
            </div>
        )
    }
}

const mapState = state => {
    return ({
        cart: state.cart.currentOrder
    })
}

const mapDispatch = dispatch => {
    return {
        submitAddress: (shippingAddress, orderId) => {
            dispatch(setShippingAddress(shippingAddress, orderId))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(CheckoutAddress))
>>>>>>> 65e56fd6fee9c0fdfd5097db5f3b7d21b3122005
