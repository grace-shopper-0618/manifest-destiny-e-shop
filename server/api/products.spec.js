const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {

    beforeEach(() => {
      return Product.create({
        title: 'Horseshoes',
        price: 999,
        inventory: 10
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('Horseshoes')
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
