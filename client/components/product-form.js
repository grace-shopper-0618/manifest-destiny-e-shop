import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProductInDb, getProductFromDb } from '../store/product'
import { addProductToState } from '../store/products'

class ProductForm extends Component {
  constructor(props) {
    super()
    const { title, description, price, inventory, photoUrl, categories } = props
    this.state = {
      title: title ? title : '',
      description: description ? description : '',
      price: price ? price : '',
      inventory: inventory ? inventory : '',
      photoUrl: photoUrl ? photoUrl : '',
      categories: categories ? categories : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT', 'ID:', this.props.match.params.id)
    console.log('STATE:', this.state)

    this.props.getProduct(Number(this.props.match.params.id))
    console.log('2nd STATE:', this.state)

  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.props.edit === true) {
      this.props.editProduct(this.state, this.props.history)
    }
    else {
      this.props.addProduct(this.state, this.props.history)
    }
  }

  render() {
    return (
      <div>
        <form id="product-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" onChange={this.handleChange} value={this.state.title} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input name="description" type="text" onChange={this.handleChange} value={this.state.description} />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input name="price" type="text" onChange={this.handleChange} value={this.state.price} />
          </div>
          <div>
            <label htmlFor="inventory">Inventory</label>
            <input name="inventory" type="text" onChange={this.handleChange} value={this.state.inventory} />
          </div>
          <div>
            <label htmlFor="photoUrl">Photo Url</label>
            <input name="photoUrl" type="text" onChange={this.handleChange} value={this.state.photoUrl} />
          </div>
          <div>
            <label htmlFor="categories">Categories</label>
            <input name="categories" type="text" onChange={this.handleChange} value={this.state.categories} />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }

}

const mapEdit = state => {
  console.log('mapEdit', state)
  return {
    title: state.product.title,
    description: state.product.description,
    price: state.product.price,
    inventory: state.product.inventory,
    photoUrl: state.product.photoUrl,
    categories: state.product.categories,
    error: state.product.error,
    edit: true
  }
}

const mapAdd = state => {
  console.log('mapAdd', state)
  return {
    error: state.products.error,
    edit: false
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProductFromDb(id)),
    editProduct: (product, history) => dispatch(editProductInDb(product, history)),
    addProduct: (product, history) => dispatch(addProductToState(product, history))
  }
}

export const EditForm = connect(mapEdit, mapDispatch)(ProductForm)
export const AddForm = connect(mapAdd, mapDispatch)(ProductForm)
