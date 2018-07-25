const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

//get all products
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.findAll({
          include: [{model: Category}]
        })
        res.status(200).json(products)
        // do we need special error handling here?
    } catch (err) {
        next(err)
    }
})

//get single product
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id,
    product = await Product.findById(id, {
      include: [{model: Category}]
    })

    if(!product) {
      const err = new Error(`No product found with id of ${id}.`)
      err.status = 404
      return next(err)
    }
    res.status(200).json(product)
  } catch (err) {
    next(err)
  }
})
