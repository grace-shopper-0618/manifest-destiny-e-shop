import React from 'react'
import { connect } from 'react-redux'
import { setSelectedCategory, deselectCategory } from '../store/selectedCategory';
import { getCategoriesFromDb } from '../store/categories';

class CategoryList extends React.Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories, selectedCategory, resetCategory, setCategory } = this.props
    return (
      <div id='categoryList'>
        <ul id='category-list'>
          <li className='selected-category'>{selectedCategory.name ? selectedCategory.name : 'All Products'}</li>

          <li id='filter-by'> Filter by Category: </li>
          {selectedCategory.name ? <li onClick={resetCategory} className='category-item'> Show All </li> : <li />}
          {
            categories && categories.map(category => (
              <li key={category.id} onClick={() => setCategory(category.id)} className='category-item' >{category.name}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

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
