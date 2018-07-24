import React from 'react'
import {connect} from 'react-redux'
import {getProductsFromDb} from '../store/products'

// COMPONENT
class AllProducts extends React.Component {
  constructor () {
    super()
    this.state = {
      products: []
    }
  }

  componentDidMount () {
    const products = this.props.fetchProducts()
    this.setState({
      products
    })
  }

  render () {
    return (<div>All products!</div>)
  }
}

// add mapstate if neccessary?

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(getProductsFromDb())
})

export default connect(null, mapDispatch)(AllProducts)

