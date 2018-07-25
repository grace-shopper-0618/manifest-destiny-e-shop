const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isActiveCart: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Order
