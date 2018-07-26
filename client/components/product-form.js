import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProductInDb, getProductFromDb } from '../store/product'
import { addProductToState } from '../store/products'
import store from '../store'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: '',
      inventory: '',
      photoUrl: '',
      categories: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT', 'ID:', this.props.match.params.id)
    if (this.props.edit) {
      const { title, description, price, inventory, photoUrl, categories } = this.props

      this.props.getProduct(Number(this.props.match.params.id))

      this.unsubscribe = store.subscribe(() => {
        console.log('PRODUCT ON STATE', store.getState())
        this.setState({
          title: store.getState().product.title || '',
          description: store.getState().product.description || '',
          price: store.getState().product.price || '',
          inventory: store.getState().product.inventory || '',
          photoUrl: store.getState().product.photoUrl || '',
          categories: store.getState().product.photoUrl || '',
        })
      })
    }
    console.log('STATE:', this.state)

  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.props.edit === true) {
      this.props.editProduct(this.state, Number(this.props.match.params.id)) //passes in local state and product id
    }
    else {
      this.props.addProduct(this.state)
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

const mapPropsForEdit = state => {
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

const mapPropsForAdd = state => {
  console.log('mapAdd', state)
  return {
    // title: '',
    // description: '',
    // price: '',
    // inventory: '',
    // photoUrl: '',
    // categories: '',
    error: state.products.error,
    edit: false
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProductFromDb(id)),
    editProduct: (product, id) => dispatch(editProductInDb(product, id)),
    addProduct: (product) => dispatch(addProductToState(product))
  }
}

export const EditForm = connect(mapPropsForEdit, mapDispatch)(ProductForm)
export const AddForm = connect(mapPropsForAdd, mapDispatch)(ProductForm)
