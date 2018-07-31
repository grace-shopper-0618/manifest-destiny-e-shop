const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Category = db.model('category')

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/categories/', () => {

    beforeEach(() => {
      return Category.create({
        name: 'Accessories for Animals',
        id: 1
      })
    })
    it('GET /api/categories/:id', async () => {
      const res = await request(app)
        .get('/api/categories/1')
        .expect(200)
      expect(res.body.name).to.be.equal('Accessories for Animals')
      expect(res.body.id).to.be.equal(1)
    })

    // passing but this logs out the error
    it('GET /api/categories/:id', async () => {
      const res = await request(app)
        .get('/api/categories/2').expect('No category found with id of 2.')
    })
  })
})
