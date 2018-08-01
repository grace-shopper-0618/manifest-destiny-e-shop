import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProductInDb, getProductFromDb } from '../store/product'
import { addProductToState } from '../store/products'
import store from '../store'
import { Redirect } from 'react-router'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: '',
      inventory: '',
      photoUrl: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderRequiredFlag = this.renderRequiredFlag.bind(this)
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.getProduct(Number(this.props.match.params.id))

      this.unsubscribe = store.subscribe(() => {
        this.setState({
          title: store.getState().product.title || '',
          description: store.getState().product.description || '',
          price: store.getState().product.price || '',
          inventory: store.getState().product.inventory || '',
          photoUrl: store.getState().product.photoUrl || ''
        })
      })
    }

  }

  componentWillUnmount() {
    if (this.state.edit) {
      this.unsubscribe()
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const updates = Object.assign({}, this.state, { price: Number(this.state.price) * 100 })

    if (this.props.edit === true) {
      this.props.editProduct(updates, Number(this.props.match.params.id))
    }
    else {
      this.props.addProduct(updates)
    }
  }

  renderRequiredFlag(field) {
    return field ? null : <span>required</span>
  }

  render() {
    if (this.props.isAdmin) {

      const enableButton = (this.state.title && this.state.price && this.state.inventory)

      return (
        <div>
          <form id="product-form" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="title">
                Title {this.renderRequiredFlag(this.state.title)}
              </label>
              <input
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input name="description" type="text" onChange={this.handleChange} value={this.state.description} />
            </div>
            <div>
              <label htmlFor="price">
                Price {this.renderRequiredFlag(this.state.price)}
              </label>
              <input
                name="price"
                type="text"
                onChange={this.handleChange}
                value={this.state.price}
              />
            </div>
            <div>
              <label htmlFor="inventory">
                Inventory {this.renderRequiredFlag(this.state.inventory)}
                </label>
              <input
                name="inventory"
                type="text"
                onChange={this.handleChange}
                value={this.state.inventory}
              />
            </div>
            <div>
              <label htmlFor="photoUrl">Photo Url</label>
              <input
                name="photoUrl"
                type="text"
                onChange={this.handleChange}
                value={this.state.photoUrl}
              />
            </div>


            <div>
              <button type="submit" disabled={!enableButton} >Submit</button>
            </div>
          </form>
        </div>
      )
    } else {
      return <Redirect to="/" />
    }
  }

}

const mapPropsForEdit = state => {
  return {
    title: state.product.title,
    description: state.product.description,
    price: state.product.price,
    inventory: state.product.inventory,
    photoUrl: state.product.photoUrl,
    error: state.product.error,
    edit: true,
    isAdmin: state.user.isAdmin,
  }
}

const mapPropsForAdd = state => {
  return {
    error: state.products.error,
    edit: false,
    isAdmin: state.user.isAdmin
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