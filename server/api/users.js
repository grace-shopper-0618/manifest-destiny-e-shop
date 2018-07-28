const router = require('express').Router()
const { User, Order } = require('../db/models')
module.exports = router

// GET /api/users/:id/orders --> getting all previous orders for a specific user (history)
router.get('/:id/orders', async (req, res, next) => {
  try {
    const { userId } = +req.params.id
    const orders = await Order.findAll({
      where: {
        userId,
        isActiveCart: false
      }
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


