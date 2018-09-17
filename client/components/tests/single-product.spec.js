
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
    testProduct = await Product.create({
      title: 'oxen',
      price: 40,
      inventory: 2,
    })
  })

  beforeEach(() => {
    singleProduct = shallow(<SingleProduct product={testProduct} user={{isAdmin: false}} match={{ params: {id: testProduct.id} }} getProduct={() => {}}/>)
  })

  it('renders the product title in an h3', () => {
    expect(singleProduct.find('h1').length).to.be.equal(1)
    expect(singleProduct.find('h1').text()).to.be.equal('oxen')
  })
})
