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

const userOnly = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    const err = new Error('Only logged in users may review a product')
    next(err)
  }
}

module.exports = { userMid, userOnly }