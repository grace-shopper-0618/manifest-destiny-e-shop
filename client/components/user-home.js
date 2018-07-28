import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserOrdersFromDb } from '../store/userOrders'
import { Order } from './order'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount () {
    const { id } = this.props.user
    this.props.getUserOrders(id)
  }

  render () {
    const { email, userOrders } = this.props
    const { reviews } = this.props.user
    return (
      <div id="userHome">
        <h2>Welcome, {email}</h2>
        <div id="userReviews">
          <h4>Your Reviews:</h4>
          {
            reviews.length ?
            reviews.map(review => {
              return (
                <div id="review" key={review.id}>
                  <p>{review.text}</p>
                </div>
              )
            }) :
            <h5>You have not reviewed any products.</h5>
          }
        </div>
        <div id="userOrders">
          <h4>Your Order History:</h4>
          {
            userOrders.length ?
            userOrders.map(order => {
              return (
                <Order order={order} key={order.id} />
              )
            }) :
            <h5>You have not placed any orders with Oregon Trail Outfitters. Get shopping!</h5>
          }
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user,
    userOrders: state.userOrders
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrders: (userId) => dispatch(getUserOrdersFromDb(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
