const router = require('express').Router()
const { LineItem } = require('../db/models')
module.exports = router

// req.body must have orderId and productId and new quantity
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const { orderId, productId } = req.params
    const { quantity } = req.body

    const lineItem = await LineItem.findOne({
      where: {
        orderId,
        productId
      }
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

