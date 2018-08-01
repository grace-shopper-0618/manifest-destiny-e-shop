const userMid = (req, res, next) => {
  if (req.user) {
    if (+req.user.id === +req.params.userId || req.user.isAdmin) {
      next()
    } else {
      const err = new Error('Not authorized')
      next(err)
    }
  } else {
    const err = new Error('Not authorized')
    next(err)
  }
}

module.exports = { userMid }