import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Order } from './order'
import { getCartFromUser, getUserOrdersFromDb } from '../store/cart';
import Dashboard from './admin-dashboard'

class UserHome extends React.Component {
  componentDidMount() {
    const { id } = this.props.user
    this.props.getUserOrders(id)
    this.props.getUserCart(id)
  }

  render() {
    const { email, userOrders } = this.props
    const { reviews } = this.props.user
    return (
      <div id="userHome">
        <h2>Welcome, {email}</h2>
        <div id="userReviews">
          <h4>Your Reviews:</h4>
          {/* <ul> */}
          {
            reviews && reviews.length ?
              reviews.map(review => {
                return (
                  <div id="review" key={review.id}>
                    {
                      review.rating > 1 ? <p>{review.rating} STARS:</p> : <p>{review.rating} STAR:</p>
                    }
                    <p>{review.text}</p>
                  </div>
                )
              }) :
              <h5>You have not reviewed any products.</h5>
          }
          {/* </ul> */}
        </div>
        <div id="userOrders">
          <h4>Your Order History:</h4>
          <ul>
            {
              userOrders.length ?
                userOrders.map(order => {
                  return (
                    <Order order={order} key={order.id} />
                  )
                }) :
                <h5>You have not placed any orders with Oregon Trail Outfitters. Get shopping!</h5>
            }
          </ul>
          {
            this.props.user.isAdmin ? <Dashboard /> : null
          }

        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    user: state.user,
    userOrders: state.cart.pastOrders
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrders: (userId) => dispatch(getUserOrdersFromDb(userId)),
    getUserCart: (userId) => dispatch(getCartFromUser(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
