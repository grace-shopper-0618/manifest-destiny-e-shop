import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductFromDb } from '../store/product'
import { removeProductFromDb } from '../store/products'
import { addItemToCart } from '../store/cart'
import ProductCategoryForm from './product-category-form'

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

  async componentDidMount () {
    const id = this.props.match.params.id
    await this.props.getProduct(id)
    if (this.props.product.reviews) {
      const reviews = this.props.product.reviews
      let sumOfRatings = 0    
      reviews.forEach(review => {
        sumOfRatings += review.rating
      })
      const avgRating = sumOfRatings / reviews.length
      console.log('Average rating: ', avgRating)
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
    console.log('** value we are submitting for quantity', evt.target.value)
    this.setState({
      quantity: +evt.target.value
    })
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

  renderDropDown (inventory) {
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
    console.log(this.props.cart)
    const item = {
      productId: +this.props.match.params.id,
      quantity: this.state.quantity,
      orderId: this.props.user.orders[0].id,
      price: this.props.product.price
    }
    this.props.addToCart(item, this.props.user)
  }

  render () {
    const {product} = this.props
    return (
      <div key={product.id}>
        <h3>{product.title}</h3>
        <h1>${product.price}</h1>
        <img src={product.photoUrl} />
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
          <p>Average Rating: {this.state.avgRating}</p>
          <ul id="reviews-list">
          {
            product.reviews && product.reviews.map(review => {
              return (
                <li key={review.id}><div className="singleReview">
                  {
                    review.rating > 1? <p>{review.rating} STARS:</p> : <p>{review.rating} STAR:</p>
                  }
                  <p>{review.text}</p>
                </div></li>
              )
            })
          }
          </ul>
        </div>
      </div>
    )
  }
}

// can we use a higher-order component here?

const mapState = state => ({
  product: state.product,
  user: state.user,
  cart: state.cart
})

const mapDispatch = (dispatch) => ({
  getProduct: (id) => dispatch(getProductFromDb(id)),
  deleteProduct: (productId) => dispatch(removeProductFromDb(productId)),
  addToCart: (item, user) => dispatch(addItemToCart(item, user))
})

export default connect(mapState, mapDispatch)(SingleProduct)

// adding a product to the cart must create a new line item with the right information

