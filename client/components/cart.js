import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCartFromUser, addItemToCart, removeItemFromCart, getTotalPrice } from '../store/cart'

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
    const { user, cart } = this.props
    // not remounting after mapState
    if (user.orders) this.props.getCart(user)

    // if (cart.id) this.props.fetchTotalPrice(cart.id)

    this.setState({
      products: cart.products || [],
      totalPrice: cart.totalPrice || 0,
      user: user || {}
    })
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
    // const products = this.props.cart.products
    const { products } = this.state

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
    fetchTotalPrice: (orderId) => dispatch(getTotalPrice(orderId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
