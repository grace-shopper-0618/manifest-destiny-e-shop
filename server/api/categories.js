const router = require('express').Router()
const {Category} = require('../db/models')
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
