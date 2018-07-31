const router = require('express').Router()
const { User, Order, LineItem, Product } = require('../db/models')
module.exports = router

router.get('/guest/cart', (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = []
    }
    res.json(req.session.cart)
  } catch (err) { next(err) }
})

// PUT that updates guest shipping information on the session
router.put('/guest/cart', (req, res, next) => {
  // adding address property to req.session
  req.session.address = req.body.concatAddress
  // sends back the edited req.session
  res.send(req.session)
})

// GET all orders for a user
router.get('/:id/orders', async (req, res, next) => {
  try {
    const userId = +req.params.id
    const orders = await Order.findAll({
      where: {
        userId
      },
      include: [{ model: LineItem,
        include: [{ model: Product }]
      }]
    })

    if(!orders) {
      const err = new Error(`User with id ${userId} has not made any purchases.`)
      err.status = 404
      return next(err)
    }

    res.status(200).json(orders)
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


