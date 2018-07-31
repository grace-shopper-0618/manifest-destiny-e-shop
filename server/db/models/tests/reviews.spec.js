const { expect } = require('chai')
const db = require('../../index')
const Review = db.model('review')

describe('Review model', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Validations', () => {
    it('review must be between 20 and 500 characters', async () => {
      try {
        const review = await Review.create({ text: 'This shouldnt pass' })
        await review.validate()
        throw Error('validation was successful but should have failed')
      }
      catch (err) {
        expect(err.message).to.contain('failed')
      }
    })
    it('successfully creates new review', async () => {
      try {
        const review = await Review.create({
          text: 'My oxen were fabulous and got us to the end of the Oregon Trail!',
          rating: 5
        })
        await review.validate()
        expect(review.rating).to.equal(5)
      }
      catch (err) {
        console.error(err)
      }
    })
  })
})
