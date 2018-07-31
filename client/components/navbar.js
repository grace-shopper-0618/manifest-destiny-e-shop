import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { getUserOrdersFromDb } from '../store/userOrders'
import { getCartFromUser } from '../store/cart';

class Navbar extends React.Component {



  componentDidUpdate(){
    const { id } = this.props.user
    if (id) {
      this.props.getUserOrders(id)
      this.props.getUserCart(id)
    }
  }

  render() {
    const { handleClick, isLoggedIn, email } = this.props
    return (
    <div>
      <nav id='navbar'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/shop'>Shop</Link></li>
        </ul>
        <h2>Oregon Trail Outfitters</h2>
        <ul>
          {isLoggedIn ? (
            <li>
              <p>Welcome,<Link to='/home'>{email}</Link></p>
              <a href='#' onClick={handleClick}>Logout</a>
            </li>
          ) : (
              <li>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign Up</Link>
              </li>
            )}
          <li><Link to='/cart'>View Cart</Link></li>
        </ul>
      </nav>
    </div>)
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getUserOrders: (userId) => dispatch(getUserOrdersFromDb(userId)),
    getUserCart: (userId) => dispatch(getCartFromUser(userId))
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
