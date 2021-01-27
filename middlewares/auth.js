const { User, Order } = require("../models")
const { verifyToken } = require("../helpers/jwt")

const authentication = (req, res, next) => {
  try {
    let decoded = verifyToken(req.headers.access_token)
    User.findOne({
      where: { email: decoded.email }
    })
      .then(data => {
        if (!data) {
          return next({ name: "WrongLogin" })
        }
        req.user = data
        return next()
      })
      .catch(err => {
        next(err)
      })
    
  } catch (error) {
    next({ name: "NotLoggedIn" })
  }
}

const adminAuthorization = (req, res, next) => {
  let userId = req.user.id
  User.findByPk(userId)
    .then(data => {
      if (data.role !== "admin") {
        return next({ name: "Unauthorized" })
      }
      next()
    })
    .catch(err => {
      next(err)
    })
}

const userAuthorization = (req, res, next) => {
  let id = req.user.id
  Order.findOne({
    where: { userId: id }
  })
    .then(data => {
      next()
    })
    .catch(err => {
      next(err)
    })
}

const userAuthorizationSingle = (req, res, next) => {
  let id = req.params.orderId
  let userId = req.user.id
  Order.findOne({
    where: { id }
  })
    .then(data => {
      if (!data) {
        return next({ name: "NotFound" })
      } else if (data.userId === userId) {
        next()
      } else {
        return next({ name: "Unauthorized" })
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = {
  authentication,
  adminAuthorization,
  userAuthorization,
  userAuthorizationSingle
}