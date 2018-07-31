const Sequelize = require('sequelize')
const db = require('../db')
const LineItem = require('./lineItem')

const Order = db.define('order', {
  isActiveCart: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  finalTotal: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  hasShipped: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  summerPromo: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  shippingAddress: {
    type: Sequelize.TEXT
  }
})

Order.getTotal = async (order) => {
  // for getting the total before order is submitted (then we can just check the finalPrice property on the model instance)
  const lineItems = await LineItem.findAll({
    where: { orderId: order.id }
  })

  const subtotal = lineItems.reduce((total, lineItem) => {
    // lineItem.price already in decimal
    return (lineItem.price * lineItem.quantity) + total
  }, 0)

  if (this.summerPromo) {
    // 50% off!!
    return subtotal * 0.50
  } else {
    return subtotal
  }
}

module.exports = Order
