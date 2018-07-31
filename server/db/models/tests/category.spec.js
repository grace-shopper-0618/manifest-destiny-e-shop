const { expect } = require('chai')
const db = require('../../index')
const Category = db.model('category')

describe('Category model', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Category', () => {
    it('successfully creates new category instance', async () => {
      try {
        const category = await Category.create({
          name: 'Accessories for Animals'
        })
        await category.validate()
        expect(category.name).to.equal('Accessories for Animals')
      }
      catch (err) {
        console.error(err)
      }
    })
  })
})
