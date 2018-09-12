
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from '../single-product'
import {Product} from '../../../server/db/models'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('SingleProduct', () => {
  let singleProduct
  let testProduct
  before(async () => {
    // need to create a product in the test database for us to use to see the single product view
    testProduct = await Product.create({
      title: 'oxen',
      price: 40,
      inventory: 2,
    })
  })

  beforeEach(() => {
    // singleProduct rendered in routes and depends on param in url to find the product...
    singleProduct = shallow(<SingleProduct />)
  })

  it('renders the product title in an h3', () => {
    expect(singleProduct.find('h3').text()).to.be.equal('oxen')
  })
})
