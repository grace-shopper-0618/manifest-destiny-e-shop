import React from 'react'
import { connect } from 'react-redux'
import { getProductsFromDb } from '../store/products'
import { Link } from 'react-router-dom'

// COMPONENT
class AllProducts extends React.Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const { selectedCategory } = this.props
    if (selectedCategory) {
      const { products } = selectedCategory
    }
    else {
      const { products } = this.props
    }
    return (
      <div id="all-products">
        {
          products.map(product => (
            <div className="product-card" key={product.id} >
              <Link to={`/shop/${product.id}`} >{product.title}</Link>
              <img className="product-card-image" src={product.photoUrl} />
              {/* does product.price give the correct price? also show part of description? show 'sold out' or similar comments to shopper based on inventory? */}
              <h4>${product.price}</h4>
              <h4>Number in stock: {product.inventory}</h4>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  selectedCategory: state.selectedCategory
})

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(getProductsFromDb())
})

export default connect(mapState, mapDispatch)(AllProducts)



