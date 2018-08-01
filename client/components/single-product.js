import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductFromDb } from '../store/product'
import { removeProductFromDb } from '../store/products'
import { addItemToCart, updateLineItem } from '../store/cart'
import ProductCategoryForm from './product-category-form'
import ReviewForm from './review-form';
import { addItemToGuestCart } from '../store/sessionCart'

//COMPONENT

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      avgRating: 0
    }
    this.renderButtons = this.renderButtons.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderDropDown = this.renderDropDown.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProduct(id)
    const { reviews } = this.props.product
    if (reviews && reviews.length) {
      let sumOfRatings = 0
      reviews.forEach(review => {
        sumOfRatings += review.rating
      })
      const avgRating = sumOfRatings / reviews.length
      this.setState({
        avgRating
      })
    }
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

  handleChange(evt) {
    evt.preventDefault()
    this.setState({
      quantity: +evt.target.value
    })
  }

  renderButtons() {
    const { user } = this.props
    if (user.isAdmin) {
      return (
        <div id='buttons'>
          <button type="button" onClick={this.handleEdit} >Edit</button>
          <button type="button" onClick={this.handleDelete} >Delete</button>
        </div>
      )
    }
  }

  renderDropDown(inventory) {
    const quantities = []
    for (let i = 1; i <= inventory; i++) {
      if (i > 5) {
        break;
      }
      quantities.push(i)
    }
    return quantities
  }

  handleAddToCart(evt) {
    evt.preventDefault()
    let item = {
      productId: +this.props.match.params.id,
      quantity: this.state.quantity,
      price: this.props.product.price
    }
    if (this.props.isLoggedIn && this.props.cart) {
      item.orderId = this.props.cart.id
      const existingItem = this.props.cart['line-items'].find(lineItem => {
        return lineItem.productId === +this.props.match.params.id
      })

      if (existingItem) {
        this.props.updateCartQuantity(existingItem, item.quantity)
      } else {
        this.props.addToCart(item)
      }
    } else {
      item.product = {
        title: this.props.product.title
      }
      this.props.addToSessionCart(item)
    }
  }

  render() {
    const { product } = this.props
    const newPhotoUrl = __dirname + product.photoUrl
    return (
      <div key={product.id} id='single-product'>
        <div id='title-and-photo'>
          <h3>{product.title}</h3>
          <h1>${product.price}</h1>
          <img className='singleProductPhoto' src={newPhotoUrl} width='500px' />
        </div>
        <div id='product-details'>
          <p>Product Description: {product.description}</p>
          <p>Categories:</p>
          <ul id='categories-list'>
            {
              product.categories && product.categories.map(category => {
                return (
                  <li key={category.name}>
                    <p>{category.name}</p>
                  </li>
                )
              })
            }
          </ul>
          <p>Inventory: {product.inventory} in stock</p>
          {
            this.renderButtons()
          }
          <form id="add-to-cart-form" onSubmit={this.handleAddToCart} >
            <select value={this.state.value} onChange={this.handleChange} >
              {
                this.renderDropDown(product.inventory).map(quantity => {
                  return <option value={quantity} key={quantity} > {quantity} </option>
                })
              }
            </select>
            <button type="submit">Add to cart</button>
          </form>
          <ProductCategoryForm />
          <div>
            <h4>Reviews</h4>
            {/* <p>Average Rating: {this.state.avgRating}</p> */}
            <ReviewForm />
            <ul id="reviews-list">
              {
                product.reviews && product.reviews.map(review => {
                  return (
                    <li key={review.id}><div className="singleReview">
                      {
                        review.rating > 1 ? <p>{review.rating} STARS:</p> : <p>{review.rating} STAR:</p>
                      }
                      <p>{review.text}</p>
                    </div></li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return ({
    product: state.product,
    user: state.user,
    cart: state.cart.currentOrder,
    isLoggedIn: !!state.user.id,
    guestCart: state.sessionCart
  })
}

const mapDispatch = (dispatch) => ({
  getProduct: (id) => dispatch(getProductFromDb(id)),
  deleteProduct: (productId) => dispatch(removeProductFromDb(productId)),
  addToCart: (item) => {
    dispatch(addItemToCart(item))
  },
  updateCartQuantity: (item, quantity) => dispatch(updateLineItem(item, quantity)),
  addToSessionCart: (item) => dispatch(addItemToGuestCart(item))
})

export default connect(mapState, mapDispatch)(SingleProduct)
