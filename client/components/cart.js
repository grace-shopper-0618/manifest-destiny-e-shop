import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getCartFromUser, addItemToCart, removeItemFromCart, getTotalPrice } from '../store/cart'
import { me } from '../store/user'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      totalPrice: 0,
      user: {}
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount')
    const { user, cart } = this.props

    // if (cart.id) this.props.fetchTotalPrice(cart.id)

    this.setState({
      products: cart.products || [],
      totalPrice: cart.totalPrice || 0,
      user: user || {}
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.getCart(this.props.user)
    }
    if (prevProps.cart.id !== this.props.cart.id) {
      this.props.fetchTotalPrice(this.props.cart.id)
    }
  }

  handleDelete(evt, product) {
    evt.preventDefault()

    this.props.deleteFromCart(product['line-item']) // we must pass it the line item
    // need to re-fetch total price? need to update totalPrice on local state?
    // this.props.fetchTotalPrice(this.props.cart)
    this.setState(prevState => {
      return {
        products: prevState.products.filter(element => element.id !== product.id)
      }
    })
  }


  // handleQuantityChange() {
  // }

  render() {
    const products = this.props.cart.products
    // const { products } = this.state

    return (
      <div id='shopping-cart'>
        <h3>Your Cart</h3>
        <ul id='cart-items'>
          {
            products.map((product) => {
              if (product['line-item']) {
                return (
                  <div key={product.id} >
                    <li>
                      {product.title}, Price: ${product.price}, Quantity: {product['line-item'].quantity}
                    </li>
                    <button onClick={(evt) => this.handleDelete(evt, product)} > Remove from order </button>

                  </div>
                )
              }
            })
          }
        </ul>
        <Link to='/checkout'>Proceed to Checkout</Link>
        <h4> Total price: ${this.state.totalPrice} </h4>
      </div>
    )
  }
}

const mapState = state => {
  console.log('mapping state to props')

  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  console.log('mapping dispatch to props')
  return {
    getCart: (user) => {
        dispatch(getCartFromUser(user))
    },
    deleteFromCart: (product) => dispatch(removeItemFromCart(product)),
    fetchTotalPrice: (orderId) => dispatch(getTotalPrice(orderId)),
    fetchUser: () => dispatch(me())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Cart))
