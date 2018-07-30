const Sequelize = require('sequelize')
const db = require('../db')
const LineItem = require('./lineItem')

const Order = db.define('order', {
  isActiveCart: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  // subtotal: {
  //   type: Sequelize.INTEGER,
  //   get() {
  //     return this.getDataValue('totalPrice')
  //   },
  //   set(value) {
  //     this.setDataValue('totalPrice', value * 100)
  //   }
  // },
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

Order.prototype.getTotal = async () => {
  const lineItems = await LineItem.findAll({
    where: {orderId : this.id}
  })
  const subtotal = lineItems.reduce((total, lineItem) => {
    return (lineItem.price * lineItem.quantity) + total
  }, 0)

  if (this.summerPromo) {
    // 50% off!!
    return (subtotal * 0.50) / 100
  }
  return subtotal / 100
}

module.exports = Order
