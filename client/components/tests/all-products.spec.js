
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from '../all-products'
import {Product} from '../../../server/db/models'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('AllProducts', () => {
  let allProducts

  const testOxen = {
    title: 'oxen',
    price: 40,
    inventory: 2,
  }

  const testHorse = {
    title: 'horse',
    price: 50,
    inventory: 3
  }

  let testProducts = [testOxen, testHorse]

  beforeEach(() => {
    allProducts = shallow(<AllProducts
      products={testProducts}
      user={{isAdmin: false}}
      selectedCateogry={{}}
      history={[]}
      match={{}} fetchProducts={() => {}} deleteProduct={() => {}}/>)
  })

  it('renders the product titles h3s', () => {
    expect(allProducts.find('h3').length).to.be.equal(2)
  })
})
