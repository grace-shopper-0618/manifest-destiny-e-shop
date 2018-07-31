const { expect } = require('chai')
const db = require('../../index')
const Product = db.model('product')

describe('Product model', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Validations', () => {
    it('requires title', async () => {
      try {
        const product = await Product.create()
        await product.validate()
        throw Error('validation was successful but should have failed without name')
      }
      catch (err) {
        expect(err.message).to.contain('title cannot be null')
      }
    })
    it('successfully creates new instance', async () => {
      try {
        const product = await Product.create({
          title: 'oxen',
          price: 40,
          inventory: 2,
        })
        await product.validate()
        expect(product.title).to.equal('oxen')
      }
      catch (err) {
        console.error(err)
      }
    })
  })
})
