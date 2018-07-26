const router = require('express').Router()
const {Product, Category, Review} = require('../db/models')
module.exports = router

//get all products from the db
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.findAll({
          include: [{model: Category}]
        })
        if (!products) {
          const err = new Error('Unable to find any products.')
          err.sendStatus(404) //should this be a different error code? it will throw if multiple filters are applied or the db is empty
        }
        res.status(200).json(products)
    } catch (err) {
        next(err)
    }
})

//get single product from the db
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id, {
      include: [{model: Category}, {model: Review}]
    })
    if (!product) {
      const err = new Error(`No product with id ${id} for sale.`)
      err.status = 404
      return next(err)
    }
    res.status(200).json(product)
  } catch (err) {
    next(err)
  }
})

//add a product to the db
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    if (!product) {
      const err = new Error('Unable to create product.')
      err.status = 406
      return next(err)
    }
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

//update a product in the db
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      const err = new Error(`Unable to find product with id of ${req.params.id}`)
      err.status = 404
      return next(err)
    }
    await product.update(req.body)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

//delete a product from the db
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Product.destroy({where: {id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//GET reviews for a single product
router.get('/:id/reviews', async (req, res, next) => {
  try {
      const productId = req.params.id
      const reviews = await Review.findAll({
          where: {productId}
      })
      if (!reviews) {
          const err = new Error(`Unable to find any reviews for the product with ID ${productId}.`)
          err.sendStatus(404)
      }
      res.status(200).json(reviews)
  } catch (err) {
      next(err)
  }
})
