const router = require('express').Router()
const { User, Order, Product, LineItem } = require('../db/models')

// getting an active order (cart) by its id
router.get('/:id')

// updating a cart by its id
router.post('/:id', async (req, res, next) => {
  try {
    // important to note: now we are expecting the the
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
