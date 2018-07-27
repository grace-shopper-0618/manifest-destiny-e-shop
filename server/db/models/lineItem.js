const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')

const LineItem = db.define('line-item', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      [Op.gt]: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      [Op.gt]: 0
    },
    get() {
      return this.getDataValue('price') / 100
    }
  }
})

module.exports = LineItem
