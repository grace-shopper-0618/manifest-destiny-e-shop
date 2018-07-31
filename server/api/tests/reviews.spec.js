const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Review = db.model('review')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/reviews', () => {

    beforeEach(() => {
      return Review.create({
        text: 'Not sure what happened with the other reviewer but I thought the flour was great! No mites here.',
        rating: 4,
      })
    })

    it('GET /api/reviews', async () => {
      const res = await request(app)
        .get('/api/reviews')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].rating).to.be.equal(4)
    })
  })

  // it('GET /api/reviews/:userId', async () => {
  //   const res = await request(app)
  //     .get('/api/reviews/1')
  //     .expect(200)
  //   expect(res.body).to.be.an('object')
  // })

  //we dont have a route for this
  // it('GET /api/reviews/:productId', async () => {
  //   const res = await request(app)
  //     .get('/api/reviews/5')
  //     .expect(200)
  //   expect(res.body).to.be.an('object')
  // })
  // })
})
