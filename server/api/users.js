const router = require('express').Router()
const { User, Order, Product, LineItem } = require('../db/models')
module.exports = router

router.get('/:id/cart', async (req, res, next) => {
  try {
    const activeCart = await Order.findOne({
      where: {
        isActiveCart: true,
        userId: req.params.id
      },
      include: [{model: Product}]
      // products: as an array on cart model, is it populating with line items??
    })

    if(!activeCart) {
      const err = new Error(`No active cart for user with id of ${req.params.id}.`)
      err.status = 404
      return next(err)
    }
    res.status(200).json(activeCart)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

// PUT update for user "cart"

// router.put('/:id/cart', async (req, res, next) => {
//   try {
//     const cart = await Order.findOne({
//       where: {
//         isActiveCart: true,
//         userId: req.params.id
//       }
//     })

//     if(!cart) {
//       const err = new Error(`No cart found for user with id of ${req.params.id}.`)
//       err.status = 404
//       return next(err)
//     }
//     const updated = await cart.update(req.body)
//     res.status(201).json(updated)
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/:id/cart', async (req, res, next) => {
  try {
    const lineItem = await LineItem.findOne({
      where: {
        orderId: +req.body.orderId,
        productId: +req.body.productId
      }
    })

    if (!lineItem) {
      const newLineItem = await LineItem.create(req.body)
      // req.body needs to include productId, orderId, quantity, price, etc.
      if(!newLineItem) {
        const err = new Error(`Unable to add item to the order.`)
        err.status = 400
        return next(err)
      }
      res.status(201).json(newLineItem)

    } else {
      // line item already exists-- lets update the quantity
      const quantity = +req.body.quantity + lineItem.quantity
      const updated = await lineItem.update({quantity})
      res.status(201).json(updated)
    }

  } catch (err) {
    next(err)
  }
})


