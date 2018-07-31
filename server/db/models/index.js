const User = require('./user')
const Product = require('./product')
const Review = require('./reviews')
const LineItem = require('./lineItem')
const Order = require('./order')
const Category = require('./category')

Product.belongsToMany(Order, { through: 'line-item' })
Order.belongsToMany(Product, { through: 'line-item' })

Order.hasMany(LineItem)
LineItem.belongsTo(Order)

Product.hasMany(LineItem)
LineItem.belongsTo(Product)

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Category, { through: 'tags' })
Category.belongsToMany(Product, { through: 'tags' })

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

module.exports = {
  User, Product, Review, LineItem, Order, Category
}
