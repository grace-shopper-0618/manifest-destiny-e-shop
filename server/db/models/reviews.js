const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  text: {
    type: Sequelize.TEXT,
    validate: {
      len: [20, 500]
    }
  }, 
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
