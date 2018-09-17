import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Dashboard} from '../admin-dashboard'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('AdminDashboard', () => {
  let adminDash

  let fakeOrder = {
    user: { email: 'testing@test.com' },
    isActiveCart: false,
    finalTotal: 60,
    hasShipped: false
  }

  let orders = [
    {...fakeOrder, id: 1},
    {...fakeOrder, id: 2}
  ]


  beforeEach(() => {
    adminDash = shallow(<Dashboard
      user={{isAdmin: true}}
      orders={orders}
      fetchOrders={() => {}}
      sendOutOrder={() => {}}
    />)
  })

  it('displays the welcome message', () => {
    expect(adminDash.find('h2').text()).to.be.equal('Welcome to the Admin Dashboard!')
  })

  it('displays info for each order', () => {
    expect(adminDash.find('h4').length).to.be.equal(2)
  })

  it('displays buttons for shipping each product for orders that have not shipped yet', () => {
    expect(adminDash.find('button').length).to.be.equal(2)
  })
})
