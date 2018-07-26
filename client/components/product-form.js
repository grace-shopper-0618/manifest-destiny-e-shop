import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProductForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      price: 0,
      inventory: 0,
      photoUrl: ''
    }
  }
  render() {
    return (
      <div>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input name="description" type="text" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input name="price" type="text" />
          </div>
          <div>
            <label htmlFor="inventory">Inventory</label>
            <input name="inventory" type="text" />
          </div>
          <div>
            <label htmlFor="photoUrl">Photo Url</label>
            <input name="photoUrl" type="text" />
          </div>
        </form>
      </div>
    )
  }

}
