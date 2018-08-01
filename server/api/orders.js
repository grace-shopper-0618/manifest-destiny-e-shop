const router = require('express').Router()
module.exports = router
const { User, Order, Product, LineItem } = require('../db/models')

// getting all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{
        model: LineItem,
        include: [{ model: Product }]
      }, {
        model: User
      }]
    })
    if (!orders) {
      const err = new Error('Unable to retrieve orders from the database')
      err.status = 404
      return next(err)
    }

    res.status(200).json(orders)
  } catch (err) { next(err) }
})

// getting an order by id
router.get('/:id', async (req, res, next) => {
  // check req.body for userid to see if anyone is logged in?
  try {
    const order = await Order.findById(+req.params.id, {
      include: [{
        model: LineItem,
        include: [{ model: Product }]
      }]
    })

    const total = await Order.getTotal(order)

    if (order) {
      // const data = {
      //   "id": order.id,
      //   "isActiveCart": order.isActiveCart,
      //   "finalTotal": order.finalTotal,
      //   "hasShipped": order.hasShipped,
      //   "summerPromo": order.summerPromo
      // }

      order.dataValues.total = total
      res.status(200).json(order)
    } else {
      const err = new Error('Unable to locate the order')
      err.status = 404
      return next(err)
    }

  } catch (error) { next(error) }

})

// post a guest order to the database
router.post('/guest', async (req, res, next) => {
  // req.session => cart ('line-items'), address, promocode
  // req.body => finalTotal
  try {
    // create guest order in database!
    const guestOrder = await Order.create({
      userId: 101,
      isActiveCart: false,
      shippingAddress: req.session.address,
      finalTotal: req.body.finalTotal * 100
    })

    // create line items!
    let lineItems = req.session.cart
    await Promise.all(lineItems.map(item => {
      return LineItem.create({
        productId: item.productId,
        orderId: guestOrder.id,
        quantity: item.quantity,
        price: item.price
      })
    }))

    // update product inventories
    await Promise.all(lineItems.map(item => {
      // update corresponding product inventory
      const updatedInventory = {
        "inventory": item.product.inventory - item.quantity
      }
      return Product.update(updatedInventory, {
        where: {
          id: item.productId
        }
      })
    }))

    // destroy session object
    req.session.cart = []
    req.session.address = ''
    res.status(201).send(guestOrder)

  } catch (err) { next(err) }



  // after order and line items created (and product inventory updated), destory the session


})

router.put('/:id', async (req, res, next) => {
  // this route will be used for updating an order status to inactive, updating a 'hasshipped', and adding shipping info
  try {
    const order = await Order.findById(+req.params.id, {
      include: [{
        model: LineItem,
        include: [{ model: Product }]
      }]
    })
    const updatedOrder = await order.update(req.body)

    // are we closing an order? if so, instantiate an new active cart for the user

    if (req.body.isActiveCart === false) {
      // make new cart for the user
      const newCart = await Order.create({
        isActiveCart: true,
        userId: order.userId
      })
      // closed order -- time to update product inventories?



    }


    res.status(201).json(updatedOrder)

  } catch (err) { next(err) }

})
