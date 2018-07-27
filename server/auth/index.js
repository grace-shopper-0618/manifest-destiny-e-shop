const router = require('express').Router()
const {User, Order, Review} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      include: [
        { model: Order,
          where: { isActiveCart: true },
          required: false
        },
        {
          model: Review
        }
      ]
    })

    console.log('**', user)

    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      if (!user.orders.length) {
        const newCart = await Order.create({ isActiveCart: true })
        newCart.setUser(user)
        user.orders.push(newCart)
        console.log('user after cart was created', user)
      }
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  // res.json(req.user)

  const user = await User.findOne({
    where: { email: req.user.email },
    include: [
      { model: Order,
        where: { isActiveCart: true },
        required: false
      },
      {
        model: Review
      }
    ]
  })

  res.json(user)

})

router.use('/google', require('./google'))
