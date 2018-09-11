import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { getCartFromUser, getUserOrdersFromDb } from '../store/cart';
import { fetchSessionCart } from '../store/sessionCart'

class Navbar extends React.Component {

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getUserOrders()
      this.props.getUserCart()
    } else {
      this.props.getGuestCart()
    }
  }

  componentDidUpdate(prevProps) {
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
      <div id='navbar-container'>
        <nav id='navbar'>
          <h2 id='nav-title'>Oregon Trail Outfitters</h2>
          <div id='nav-items'>
            <div className='nav-item'><Link to='/'>Home</Link></div>
            <div className='nav-item'><Link to='/shop'>Shop</Link></div>
            {isLoggedIn ? (
              <div className='nav-item'><Link to='/home'>Profile</Link></div>
            ) : (
                <div className='nav-item'><Link to='/login'>Login</Link></div>
              )}
            {isLoggedIn ? (
              <div className='nav-item'><a href='#' onClick={handleClick}>Logout</a></div>
            ) : (
                <div className='nav-item'><Link to='/signup'>Sign Up</Link></div>
              )}
            <div className='nav-item'><a>Items in cart: {cartQuantity}</a></div>
            <div className='nav-item'><Link to='/cart'>View Cart</Link></div>
          </div>
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
