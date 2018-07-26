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
        title: 'Set of Four Horseshoes',
        price: 1299,
        inventory: 50
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect (res.body).to.be.an('array')
      expect (res.body[0].title).to.be.equal('Set of Four Horseshoes')
    })

    it('GET /api/products/:id', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.title).to.be.equal('Set of Four Horseshoes')
    })

    it('POST /api/products', async () => {
      const newProduct = Product.create({
          title: 'Sack of Potatoes',
          price: 1299,
          inventory: 50,
          description: 'Starches are an important part of a balanced diet'
        })
      const res = await request(app)
        .post('/api/products', newProduct)
        .expect(201)
      expect(res.body).to.be.an('object')
      expect(res.title).to.equal('Sack of Potatoes')
      expect(res.description).to.be.equal('Starches are an important part of a balanced diet')
    })

    it('PUT /api/products', async () => {
      await request(app)
        .put('/api/products/1', {
          description: 'Set of four (4) certified lucky iron horseshoes.'
        })
        .expect(201)
      const updatedProduct = await Product.findById(1)
      expect(updatedProduct.description).to.equal('Set of four (4) certified lucky iron horseshoes.')
    })

    it('DELETE /api/products/:id', async () => {
      await request(app)
        .delete('/api/products/1')
        .expect(204)
    })
    
  }) // end describe('/api/products')
}) // end describe('Product routes')
