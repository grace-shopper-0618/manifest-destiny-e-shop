const router = require('express').Router()
const {Category, Product} = require('../db/models')
module.exports = router

//get for path /api/categories
router.get('/', async (req, res, next) => {
  try {
      const categories = await Category.findAll()
      res.status(200).json(categories)
  } catch (err) {
      next(err)
  }
})

//get path for /api/categories/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id
    const category = await Category.findById(id, {
      include: [{model: Product}]
    })

    if(!category) {
      const err = new Error(`No category found with id of ${id}.`)
      err.status = 404
      return next(err)
    }

    res.status(200).json(category)
  } catch (err) {
    next(err)
  }
})
