import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitNewCategory } from '../store/categories';

class CategoryForm extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      name: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.createNewCategory(this.state)
    this.setState({
      name: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            New Category Name
            {!this.state.name.length ? <span>required</span> : null}
          </label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <button type="submit" disabled={!this.state.name.length}>Add Category</button>
        </form>
      </div>
    )
  }
}


const mapState = state => ({
  categories: state.categories
})

const mapDispatch = dispatch => ({
  createNewCategory: (category) => dispatch(submitNewCategory(category))
})

export default connect(mapState, mapDispatch)(CategoryForm)
