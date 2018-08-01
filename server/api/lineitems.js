const router = require('express').Router()
const { LineItem, Order, Product } = require('../db/models')
module.exports = router

router.post('/guestCart', async (req, res, next) => {
  console.log('PRICE IN GUESTCART', req.body.price)
  req.body.price = req.body.price / 100
  req.session.cart.push(req.body)
  const { productId } = req.body
  const product = await Product.findById(productId),
    inventory = product.inventory
  // make sure that the req.body includes the product info (title/price/id), quantity
  req.body.product.inventory = inventory
  // including inventory on req.body to display increment/decrement buttons based on available inventory
  res.json(req.body)
})

// posting a new line item for an order
router.post('/:orderId', async (req, res, next) => {
  try {
    // make sure this order is active
    const order = await Order.findOne({
      where: {
        id: +req.params.orderId
      }
    })

    if (!order) {
      const err = new Error('Unable to find order')
      err.status = 404
      return next(err)
    }

    if (!order.isActiveCart) {
      res.status(400).send('This order cannot be edited')
    }

    const newLineItem = await LineItem.create(req.body)
    const foundLineItem = await LineItem.findOne({
      where: {
        orderId: newLineItem.orderId,
        productId: newLineItem.productId
      },
      include: [{ model: Product }]
    })

    res.status(201).json(foundLineItem)

  } catch (err) { next(err) }
})

router.put('/guestCart', (req, res, next) => {
  req.session.cart = req.session.cart.map(item => {
    if (item.productId === req.body.productId) {
      return req.body
    } else return item
  })
  // req.body needs to include product info (title/price/id), quantity
  res.json(req.body)
})

// req.body must have orderId and productId and new quantity
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const { orderId, productId } = req.params
    const { quantity } = req.body

    const lineItem = await LineItem.findOne({
      where: {
        orderId,
        productId
      },
      include: [{ model: Product }]
    })

    if (!lineItem) {
      const err = new Error(`Unable to locate the line item you want to update`)
      err.status = 404
      return next(err)
    }

    const updatedLineItem = await lineItem.update({ quantity })

    res.status(201).json(updatedLineItem)

  } catch (err) { next(err) }
})

router.delete('/guestCart/:productId', (req, res, next) => {
  // sending the item to delete as req.body
  const { productId } = req.params

  const item = req.session.cart.find(item => item.productId === +productId),
    index = req.session.cart.indexOf(item)
  req.session.cart.splice(index, 1)
  console.log('req session before', req.session)
  console.log('=== cart after splice ===', req.session.cart)
  console.log('req session after', req.session)
  res.sendStatus(204)
})

// req.body must have orderId and productId
router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    const { orderId, productId } = req.params
    const lineItem = await LineItem.findOne({
      where: {
        orderId,
        productId
      }
    })

    if (!lineItem) {
      const err = new Error(`Unable to remove the item with id ${productId} from the order`)
      err.status = 404
      return next(err)
    }

    await lineItem.destroy()
    res.send(204)

  } catch (err) { next(err) }
})

router.get('/:orderId/:productId', async (req, res, next) => {
  try {
    const { orderId, productId } = req.params
    const lineItem = await LineItem.findOne({
      where: {
        orderId,
        productId
      }
    })

    if (!lineItem) {
      res.status(404)
      return
    }

    res.json(lineItem)

  } catch (err) { next(err) }
})
