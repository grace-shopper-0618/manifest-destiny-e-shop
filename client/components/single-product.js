import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductFromDb} from '../store/product'

//COMPONENT

class SingleProduct extends Component {
  componentDidMount () {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  render () {
    const {product, user} = this.props
    return (
      <div key={product.id}>
      <p>{hellokitty.email}</p>
        <h3>{product.title}</h3>
        <h1>${product.price}</h1>
        <img src={product.photoUrl} />
        <p>{product.description}</p>
        {
          product.categories && product.categories.map(category => {
            return (
              <div key={category.name}>
                <p>{category.name}</p>
              </div>
            )
          })
        }
        <p>{product.inventory} in stock</p>
        {
          product.reviews && product.reviews.map(review => {
            return (
              <div key={review.id}>
                <p>{review.text}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product,
  user: state.user
})

const mapDispatch = dispatch => ({
  getProduct: (id) => dispatch(getProductFromDb(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)