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

    it('GET /api/products/', async () => {
      const res = await request(app)
        .get('/api/products/')
        .expect(200)

      expect (res.body).to.be.an('array')
    })

    it('GET /api/products/:id', async () => {
      const res = await request(app)
        .get('/api/products/8')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.title).to.be.equal('Palomino Horse')
    })

    it('DELETE /api/products', async () => {
      await request(app)
        .put('/api/products/8')
        .expect(204)
    })
    
    it('POST /api/products/', async () => {
      const newProduct = Product.create({
          title: 'Set of four (4) horseshoes',
          price: 799,
          inventory: 50,
          description: 'Four (4) certified lucky iron horseshoes'
        })
      const res = await request(app)
        .post('/api/products/', newProduct)
        .expect(201)
      expect(res.body).to.be.an('object')
      expect(res.title).to.equal('Set of four (4) horseshoes')
      expect(res.description).to.be.equal('Four (4) certified lucky iron horseshoes')
    })

    it('GET /api/products/:id', async () => {
      const res = await request(app)
        .get('/api/products/8')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.title).to.be.equal('Set of Four Horsehoes')
    })

    it('PUT /api/products', async () => {
      const res = await request(app)
        .put('/api/products/8', {
          description: 'Sack of Potatoes.'
        })
        .expect(200)
      expect(res.body).to.be.an.an('object')
      expect(res.description).to.equal('Starches are an important part of a healthy diet.')
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
