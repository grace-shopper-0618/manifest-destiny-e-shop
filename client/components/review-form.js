import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitNewReview } from '../store/product'

class ReviewForm extends Component {

  constructor() {
    super()
    this.state = {
      rating: 0,
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const { product, user } = this.props
    this.props.addNewReview(this.state, product.id, user.id)

    this.setState({
      rating: 0,
      text: ''
    })
  }

  render() {
    if (this.props.user.id) {
      const invalidRating = this.state.rating > 5 || this.state.rating < 1
      const invalidText = this.state.text.length < 20

      return (
      <div id="review-form">
        <h4>Write a review for this product:</h4>
        <form onSubmit={this.handleSubmit}>

          <div id="review-rating">
            <label htmlFor="rating"> Rating between 1 and 5
            </label>
            <input
              name="rating"
              type="number"
              onChange={this.handleChange}
              value={this.state.rating}
            />
          </div>

          <div id="review-text">
            <label htmlFor="text"> Text
            </label>
            <input
              name="text"
              type="text"
              onChange={this.handleChange}
              value={this.state.text}
            />
          </div>
          {
            invalidRating ? <h6> Your star rating must be between 1 and 5 </h6> : null
          }
          {
            invalidText ? <h6> Your text must be at least 20 characters long </h6> : null
          }
          <button disabled={invalidRating || invalidText}> Submit </button>
        </form>
      </div>
      )
    } else {
      // no user logged in (works with oauth?), so no form
      return null
    }
  }
}

// CONNECTED COMPONENT

const mapState = state => {
  return {
    product: state.product,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addNewReview: (reviewBody, productId, userId) => dispatch(submitNewReview(reviewBody, productId, userId))
  }
}

export default connect(mapState, mapDispatch)(ReviewForm)
