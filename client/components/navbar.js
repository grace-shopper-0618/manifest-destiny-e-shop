import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, email, id }) => (
  <div>
    <nav id='navbar'>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/shop'>Shop</Link></li>
        <li><h2>Oregon Trail Outfitters</h2></li>
        {isLoggedIn ? (
          <li id='loggedIn'>
            <p>Welcome,<Link to='/home'>{email}</Link></p>
            <a href='#' onClick={handleClick}>Logout</a>
          </li>
        ) : (
          <li id='loggedOut'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </li>
        )}
        <li id='viewCart'><Link to={`/${id}/cart`}>View Cart</Link></li>
      </ul>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email,
    id: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
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
