const { expect } = require('chai')
const db = require('../../index')
const Order = db.model('order')

describe('Order model', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Validations', () => {
    it('requires isActiveCart', async () => {
      try {
        const order = await Order.create()
        await order.validate()
        throw Error('validation was successful but should have failed without isActiveCart property')
      }
      catch (err) {
        expect(err.message).to.contain('isActiveCart cannot be null')
      }
    })
    it('successfully creates new order instance with active cart', async () => {
      try {
        const order = await Order.create({
          isActiveCart: true
        })
        await order.validate()
        expect(order.isActiveCart).to.equal(true)
      }
      catch (err) {
        console.error(err)
      }
    })
  })
})
