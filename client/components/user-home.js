import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {reviews} = props.user
 
  return (
    <div id="userHome">
      <h2>Welcome, {email}</h2>
      <div id="userReviews">
        <h4>Your Reviews</h4>
        {
          reviews.map(review => {
            return (
              <div id="review" key={review.id}>
                <p>{review.text}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
