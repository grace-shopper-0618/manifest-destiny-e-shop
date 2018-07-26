import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductFromDb} from '../store/product'
import { removeProductFromDb } from '../store/products';

//COMPONENT

class SingleProduct extends Component {
  constructor() {
    super()
    this.renderButtons = this.renderButtons.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  handleEdit(evt) {
    evt.preventDefault()
    const productId = this.props.match.params.id
    this.props.history.push(`/shop/${productId}/edit`)
  }

  handleDelete(evt) {
    evt.preventDefault()
    const productId = this.props.match.params.id
    this.props.deleteProduct(productId)
  }

  renderButtons () {
    const {user} = this.props
    if (user.isAdmin) {
      return (
        <div id='buttons'>
          <button type="button" onClick={this.handleEdit} >Edit</button>
          <button type="button" onClick={this.handleDelete} >Delete</button>
        </div>
      )
    }
  }

  render () {
    const {product} = this.props
    return (
      <div key={product.id}>
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
        {this.renderButtons()}
      </div>
    )
  }
}

// can we use a higher-order component here?

const mapState = state => ({
  product: state.product,
  user: state.user
})

const mapDispatch = (dispatch) => ({
  getProduct: (id) => dispatch(getProductFromDb(id)),
  deleteProduct: (productId) => dispatch(removeProductFromDb(productId))
})

export default connect(mapState, mapDispatch)(SingleProduct)


// after deleting from the single page view, the allproducts view still displays it... why isn't store getting updated and then rerendering the correct list of products?
