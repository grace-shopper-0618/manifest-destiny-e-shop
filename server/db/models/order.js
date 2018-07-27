const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isActiveCart: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
  // totalPrice: {
  //   type: Sequelize.INTEGER,
  //   get() {
  //     return this.getDataValue('totalPrice') / 100
  //   },
  //   set(value) {
  //     this.setDataValue('totalPrice', value)
  //   }
  // }
})

module.exports = Order
