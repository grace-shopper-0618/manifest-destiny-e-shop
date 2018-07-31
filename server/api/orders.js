const router = require('express').Router()
module.exports = router
const { User, Order, Product, LineItem } = require('../db/models')

// find a specific user's orders is in /api/users/

// getting an active order (cart) by its id
router.get('/:id', async (req, res, next) => {
  // check req.body for userid to see if anyone is logged in
  try {
    const order = await Order.findById(+req.params.id, {
      include: [{
        model: LineItem,
        include: [{ model: Product }]
      }]
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
      res.status(200).send(order)
    } else {
      const err = new Error('Unable to locate the order')
      err.status = 404
      return next(err)
    }

  } catch (error) { next(error) }

})

router.get('/:id/total', async (req, res, next) => {
  try {
    const order = await Order.findById(+req.params.id)
    console.log('ORDER', order)

    if (order) {
      const totalPrice = await Order.getTotal(order)

      res.json({"totalPrice": totalPrice})

    } else {
      const err = new Error('Unable to locate the order')
      err.status = 404
      return next(err)
    }


  } catch (err) { next(err) }
})



// router.put('/:id', async (req, res, next) => {
//  // this route will be used for updating an order status to inactive and maybe a hasShipped property
// })
