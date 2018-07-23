const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      [Op.gt]: 0
    },
    //getter to display price correctly. Come back to this if we aren't getting correct prices.
    //may need to add a setter, but will come back to it.
    get() {
      return this.getDataValue('price') / 100
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      [Op.gte]: 0
    }
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.crystalinks.com/wagonwheel.jpg',
    validate: {
      isUrl: true
    }
  }
}
)

Product.beforeValidate(product => {
  product.category = product.category.split(', ')
})

