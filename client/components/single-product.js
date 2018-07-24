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
    const {product} = this.props
    return (
      <div>
        <h3>{product.title}</h3>
        <h1>{product.price}</h1>
        <img src={product.photoUrl} />
        <p>{product.descriiption}</p>
        <p>{product.inventory} in stock</p>
        {/* ADD REVIEWS TO THIS COMPONENT */}
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product
})

const mapDispatch = dispatch => ({
  getProduct: (id) => dispatch(getProductFromDb(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)