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
      photoUrl: '',
      categories: [] // note: this must get filled with category objects
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderRequiredFlag = this.renderRequiredFlag.bind(this)
    this.addCategory = this.addCategory.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
  }

  componentDidMount() {
    // fetch categories from database
    if (this.props.edit) {
      const { title, description, price, inventory, photoUrl, categories } = this.props

      this.props.getProduct(Number(this.props.match.params.id))
      // eager load categories in the get single product?

      this.unsubscribe = store.subscribe(() => {
        console.log('PRODUCT ON STATE', store.getState())
        this.setState({
          title: store.getState().product.title || '',
          description: store.getState().product.description || '',
          price: store.getState().product.price || '',
          inventory: store.getState().product.inventory || '',
          photoUrl: store.getState().product.photoUrl || '',
          // categories: store.getState().product.categories || '',
        })
      })
    }
    console.log('STATE:', this.state)

  }

  componentWillUnmount() {
    if (this.state.edit) {
      this.unsubscribe()
      // for some reason this is throwing errors when we submit for add but not for edit
      // being kind of hacky right now with the conditional to sidestep this bug...
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
      this.props.editProduct(updates, Number(this.props.match.params.id, this.state.categories)) //passes in local state and product id
    }
    else {
      this.props.addProduct(updates, this.state.categories)
    }
  }

  renderRequiredFlag(field) {
    // we pass this method the part of state we are checking
    return field ? null : <span>required</span>
  }

  addCategory(category) {
    // add category to state
  }

  removeCategory(category) {
    // remove category from state
  }

  render() {
    if (this.props.isAdmin) {
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

            <div id="product-form-categories" >
              {
                this.props.categories && this.props.categories.map( category => {
                  if (this.state.categories.indexOf(category) === -1) {
                    return (
                    <div key={category.id} >
                      {category.name}
                      <button onClick={() => this.addCategory(category)} > + </button>
                    </div>
                    )
                  } else {
                    return (
                      <div key={category.id} >
                        {category.name}
                        <button onClick={() => this.removeCategory(category)} > - </button>
                      </div>
                    )
                  }
                })
              }
            </div>

            <div>
              <button type="submit">Submit</button>
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
  console.log('mapEdit', state)

  return {
    title: state.product.title,
    description: state.product.description,
    price: state.product.price,
    inventory: state.product.inventory,
    photoUrl: state.product.photoUrl,
    categories: state.product.categories,
    error: state.product.error,
    edit: true,
    isAdmin: state.user.isAdmin,
    allCategories: state.categories
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
    edit: false,
    isAdmin: state.user.isAdmin,
    allCategories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProductFromDb(id)),
    editProduct: (product, id, categories) => dispatch(editProductInDb(product, id, categories)),
    addProduct: (product, categories) => dispatch(addProductToState(product, categories))
  }
}

export const EditForm = connect(mapPropsForEdit, mapDispatch)(ProductForm)
export const AddForm = connect(mapPropsForAdd, mapDispatch)(ProductForm)

// note to consider: a product needs a category, but what happens if we try to submit without a category? need form validation?
// error when trying to add a new product --> getting this.unsubscribe is not a function

