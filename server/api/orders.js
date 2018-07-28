const router = require('express').Router()
module.exports = router
const { User, Order, Product, LineItem } = require('../db/models')

// getting an active order (cart) by its id
router.get('/:id', async (req, res, next) => {
  // check req.body for userid to see if anyone is logged in
  try {
    const order = await Order.findById(+req.params.id, {
      include: [{ model: Product }]
    })

    // const userId = +req.body.userId
    // if (userId) {
    //   const activeCart = await Order.findOne({
    //     where: {
    //       isActiveCart: true,
    //       userId
    //     },
    //     include: [{ model: Product }]
    //   })

    //   if (!activeCart) {
    //     const err = new Error(`No active cart for user with id of ${userId}`)
    //     err.status = 404
    //     return next(err)
    //   }

    //   res.status(200).json(activeCart)
    // } else {
    //   // we have to find the cart by its session
    // }

    if (order) {
      res.status(200).json(order)
    } else {
      const err = new Error('Unable to locate the order')
      err.status = 404
      return next(err)
    }

  } catch (error) { next(error) }


})

// updating a cart by its  order id
router.post('/:id', async (req, res, next) => {
  try {
    // make sure this order is active
    const order = await Order.findOne({
      where: {
        id: +req.params.id
      }
    })

    if (!order.isActiveCart) {
      console.log('order cannot be edited after purchase')
      res.status(400).send('This order cannot be edited')
    }

    const lineItem = await LineItem.findOne({
      where: {
        orderId: +req.params.id,
        productId: +req.body.productId
      }
    })

    if (!lineItem) {
      const newLineItem = await LineItem.create({...req.body, price: req.body.price * 100})
      if (!newLineItem) {
        const err = new Error('Unable to add item to the order')
        err.status = 400
        return next(err)
      }


      res.status(201).json(newLineItem)
    } else {
      const quantity = +req.body.quantity + lineItem.quantity
      const updated = await lineItem.update({ quantity })
      res.status(201).json(updated)
    }


  } catch (err) { next(err) }
})

// router.put('/:id', async (req, res, next) => {
//  // this route will be used for updating an order status to inactive and maybe a hasShipped property
// })
