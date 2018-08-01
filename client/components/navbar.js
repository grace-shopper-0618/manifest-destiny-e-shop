import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { getCartFromUser, getUserOrdersFromDb } from '../store/cart';
import { fetchSessionCart } from '../store/sessionCart'

class Navbar extends React.Component {

  componentDidMount(){
    if (this.props.isLoggedIn) {
      this.props.getUserOrders()
      this.props.getUserCart()
    } else {
      this.props.getGuestCart()
    }
  }

  componentDidUpdate(prevProps){
    const { id } = this.props.user
    if (id) {
      if (prevProps.cart && !prevProps.cart['line-items']) {
        this.props.getUserOrders(id)
        this.props.getUserCart(id)
      }
    }
  }

  render() {
    const { handleClick, isLoggedIn, email, guestCart } = this.props

    let cartQuantity = 0;
    if (isLoggedIn && this.props.cart && this.props.cart['line-items']) {
      cartQuantity = this.props.cart['line-items'].reduce((total, item) => {
        return total + item.quantity
      }, 0)
    } else {
      cartQuantity = guestCart.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    }

    return (
    <div>
      <nav id='navbar'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/shop'>Shop</Link></li>
          <li><h2>Oregon Trail Outfitters</h2></li>
          {isLoggedIn ? (
            <li><p>Welcome,<Link to='/home'>{email}</Link></p></li>
          ) : (
            <li><Link to='/login'>Login</Link></li>
          )}
          {isLoggedIn ? (
            <li><a href='#' onClick={handleClick}>Logout</a></li>
          ) : (
            <li><Link to='/signup'>Sign Up</Link></li>
          )}
          <li><h5>Items in cart: {cartQuantity}</h5></li>
          <li><Link to='/cart'>View Cart</Link></li>
        </ul>
      </nav>
    </div>)
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email || '',
    user: state.user,
    cart: state.cart.currentOrder,
    guestCart: state.sessionCart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getUserOrders: (userId) => dispatch(getUserOrdersFromDb(userId)),
    getUserCart: (userId) => dispatch(getCartFromUser(userId)),
    getGuestCart: () => dispatch(fetchSessionCart())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
