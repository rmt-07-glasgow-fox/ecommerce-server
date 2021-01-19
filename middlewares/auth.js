const { checkToken } = require('../helpers/jwt')
const { User, Product } = require('../models')

const authenticate = ((req, res, next) => {
  try {
    const decoded = checkToken(req.headers.access_token)
    User.findOne({
      where: {
        email: decoded.email
      }
    })
    .then(user => {
      if(!user) {
        res.status(401).json({message: "Please login first"})
      } else {
        req.user = { 
          id: user.id
        }
        next()
      }
    })
    .catch(err => {
      next(err)
    })
  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

const authorize = ((req, res, next) => {
  const productId = +req.params.id

  Product.findOne({
    where: {
      id: productId
    }
  })
  .then(product => {
    if(!product || product.UserId !== req.user.id) {
      res.status(401).json({message: "Unauthorized"})
    } else {
      next()
    }
  })
  .catch(err => {
    next(err)
  })
})

module.exports = {
  authenticate,
  authorize
}