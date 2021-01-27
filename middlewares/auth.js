const {checkToken} = require("../helpers/jwt")
const {User, Product, CartList} = require("../models")

async function authenticate(req, res, next) {
  try {
    if (!req.headers.access_token) {
      next({name: `Not Authorized`})
    } else {
      let decoded = checkToken(req.headers.access_token)
      let find = await User.findOne({where: {email: decoded.email}})
      if (find && find.role === "Admin") {
        req.user = {
          id: find.id
        }
        next()
      } else if (find && find.role !== "Admin") {
        next({name: `Not Authorized`})
      } else {
        next({name: `Not Found`})
      }
    }
    
  } catch (err) {
    next(err)
  }
}

async function authenticateCust(req, res, next) {
  try {
    if (!req.headers.access_token) {
      next({name: `Not Authorized`})
    } else {
      let decoded = checkToken(req.headers.access_token)
      let find = await User.findOne({where: {email: decoded.email}})
      if (find && find.role === "Customer") {
        req.user = {
          id: find.id
        }
        next()
      } else {
        next({name: `Not Found`})
      }
    }
    
  } catch (err) {
    next(err)
  }
}

async function authorize(req, res, next) {
  try {
    let data = await Product.findOne({where: {id: +req.params.id}})
    if (!data) {
      next({name: `Not Found`})
    } else if (data.UserId !== req.user.id) {
      next({name: `Not Authorized`})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

async function authorizeCust(req, res, next) {
  try {
    let data = await CartList.findOne({where: {id: +req.params.id}})
    if (!data) {
      next({name: `Not Found`})
    } else if (data.UserId !== req.user.id) {
      next({name: `Not Authorized`})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {authenticate, authenticateCust, authorize, authorizeCust}