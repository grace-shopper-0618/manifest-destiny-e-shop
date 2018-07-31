const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/orders/', () => {

    beforeEach(() => {
      return Order.create({
        isActiveCart: true,
        id: 2
      })
    })

    it('GET /api/orders/:id', async () => {
      const res = await request(app)
        .get('/api/orders/2')
        .expect(200)
      expect(res.body.isActiveCart).to.be.equal(true)
      expect(res.body.id).to.be.equal(2)

    })
  })
})
