const { expect } = require('chai')
const db = require('../../index')
const LineItem = db.model('line-item')

describe('LineItem model', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Line Item', () => {
    it('requires quantity', async () => {
      try {
        const lineItem = await LineItem.create()
        await lineItem.validate()
        throw Error('validation was successful but should have failed without quantity')
      }
      catch (err) {
        expect(err.message).to.contain('quantity cannot be null')
      }
    })
  })
})
