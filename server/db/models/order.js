const Sequelize = require('sequelize')
const db = require('../db')
const LineItem = require('./lineItem')

const Order = db.define('order', {
  isActiveCart: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  subtotal: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('totalPrice') / 100
    },
    set(value) {
      this.setDataValue('totalPrice', value * 100)
    }
  }
})

Order.prototype.getTotal = async () => {
  const lineItems = await LineItem.findAll({
    where: {orderId : this.id}
  })
  const subtotal = lineItems.reduce((total, lineItem) => {
    return (lineItem.price * lineItem.quantity) + total
  }, 0)
  return subtotal / 100
}

module.exports = Order
