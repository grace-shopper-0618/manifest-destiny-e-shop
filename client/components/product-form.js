import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProductInDb } from '../store/product'

class ProductForm extends Component {
  constructor() {
    super()
    this.state = {
      title: this.props.title,
      description: this.props.description,
      price: this.props.price,
      inventory: this.props.inventory,
      photoUrl: this.props.photoUrl
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()

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
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }

}

const mapEdit = state => {
  return {
    title: state.product.title,
    description: state.product.description,
    price: state.product.price,
    inventory: state.product.inventory,
    photoUrl: state.product.photoUrl
  }

}
}

const mapAdd = state => {
  return {
    title: '',
    description: '',
    price: 0,
    inventory: 0,
    photoUrl: ''
  }

}

const mapDispatch = (dispatch) => {
  return {
    editProductInDb: (product, history) => dispatch(editProductInDb(product, history))
  }
}

export const EditForm = connect(mapEdit, mapDispatch)(ProductForm)
export const AddForm = connect(mapAdd, mapDispatch)(ProductForm)
