const { User } = require("../models")
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
        console.log(err);
        next(err)
      })
    
  } catch (error) {
    console.log(error);
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

module.exports = {
  authentication,
  adminAuthorization
}