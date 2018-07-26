import React from 'react'
import {connect} from 'react-redux'
import { setSelectedCategory, deselectCategory } from '../store/selectedCategory';
import { getCategoriesFromDb } from '../store/categories';

class CategoryList extends React.Component {

  componentDidMount () {
    this.props.fetchCategories()
  }

  render () {
    const { categories, selectedCategory, resetCategory, setCategory } = this.props
    return (
      <div id='categoryList'>
        <ul id='category-list'>
          <li className='title'>Displaying:</li>
          <li>{selectedCategory.name ? selectedCategory.name : 'All Products'}</li>
          { selectedCategory.name? <li onClick={resetCategory} > Show All </li> : <li />}
          <li className='title'> Filter by: </li>
          {
            categories && categories.map(category => (
              <li key={category.id} onClick={() => setCategory(category.id)} >{category.name}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

//CONNECTED COMPONENT
const mapState = state => ({
  categories: state.categories,
  selectedCategory: state.selectedCategory
})

const mapDispatch = (dispatch) => ({
  fetchCategories: () => dispatch(getCategoriesFromDb()),
  setCategory: (categoryId) => dispatch(setSelectedCategory(categoryId)),
  resetCategory: () => dispatch(deselectCategory())
})

export default connect(mapState, mapDispatch)(CategoryList)
