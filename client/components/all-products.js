import React from 'react'
import { connect } from 'react-redux'
import { getProductsFromDb, removeProductFromDb } from '../store/products'
import { Link } from 'react-router-dom'
import CategoryList from './category-list'

// COMPONENT
class AllProducts extends React.Component {
  constructor() {
    super()
    this.renderButtons = this.renderButtons.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleEdit(evt, productId) {
    evt.preventDefault()
    this.props.history.push(`/shop/${productId}/edit`)
  }

  handleDelete(evt, productId) {
    evt.preventDefault()
    this.props.deleteProduct(productId)
    this.handleClick = this.handleClick.bind(this)
  }

  renderButtons(productId) {
    const { user } = this.props
    if (user && user.isAdmin) {
      return (
        <div>
          <button type="button" onClick={(evt) => this.handleEdit(evt, productId)}>Edit</button>
          <button type="button" onClick={(evt) => this.handleDelete(evt, productId)} >Delete</button>
        </div>
      )
    }
  }

  renderAdd() {
    const { user } = this.props
    if (user && user.isAdmin) {
      return (
        <div id="add">
          <button type="button" onClick={this.handleClick} >Add New Product</button>
        </div>
      )
    }
  }

  handleClick(evt) {
    evt.preventDefault()
    this.props.history.push('/shop/add')
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const selectedCategory = this.props.selectedCategory
    if (selectedCategory.name) {
      var { products } = selectedCategory
    }
    else {
      products = this.props.products
    }
    return (
      <div className='wholePage'>
        <CategoryList />
        <div id="all-products">
          {this.renderAdd()}
          {
            products.map(product => (
              <div className="product-card" key={product.id} >
                <Link to={`/shop/${product.id}`} >{product.title}</Link>
                <div className="product-card-image">
                  <img src={product.photoUrl} max-width='175px' max-heigh='175px' />
                </div>
                <h4>${product.price}</h4>
                <div id='product-card-footer'>
                  <h5>{product.inventory} in stock</h5>
                  {this.renderButtons(product.id)}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  selectedCategory: state.selectedCategory,
  user: state.user
})

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(getProductsFromDb()),
  deleteProduct: (productId) => dispatch(removeProductFromDb(productId))
})

export default connect(mapState, mapDispatch)(AllProducts)



