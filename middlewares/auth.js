const { checkToken } = require('../helpers/jwt')
const { User, Cart, Wishlist } = require('../models')

class Auth {
  static authLoginAdmin(req, res, next) {
    try {
      const email = req.body.email
      if (!email) {
        res.status(400).json({ message: 'Email or password cannot be empty!' })
      } else {
        User.findOne({ where: { email } })
          .then(user => {
            user && user.role === 'admin' ? next() :
            user && user.role !== 'admin' ?
            res.status(400).json({ message: 'Email or password wrong!' }) : //forbidden but show as wrong email or password
            res.status(400).json({ message: 'Email or password wrong!' })
          })
          .catch(err => {
            res.status(500).json({ message: 'Internal Server Error' })
          })
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static authorizationAdmin(req, res, next) {
    const role = req.UserData.role
    role !== 'admin' ? res.status(403).json({ message: 'You dont have access!' }) ://forbidden 
    next()
  }

  static authentication(req, res, next) {
    try {
      const { access_token } = req.headers
      if (access_token) {
        let payload = checkToken(access_token)
        User.findByPk(payload.id)
          .then(user => {
            !user ? res.status(404).json({ message: 'User Not Found!' }) :
            req.UserData = payload, next()
          })
          .catch(err => {
            res.status(500).json({ message: 'Internal Server Error' })
          })
      }
      else {
        res.status(401).json({ message: 'Please login first!' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static authLoginCust(req, res, next) {
    try {
      const email = req.body.email
      if (!email) {
        res.status(400).json({ message: 'Email or password cannot be empty!' })
      } else {
        User.findOne({ where: { email } })
          .then(user => {
            user && user.role === 'customer' ? next() :
            user && user.role !== 'customer' ?
            res.status(400).json({ message: 'Email or password wrong!' }) : //forbidden but show as wrong email or password
            res.status(400).json({ message: 'Email or password wrong!' })
          })
          .catch(err => {
            res.status(500).json({ message: 'Internal Server Error' })
          })
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static authorizationCart(req, res, next) {
    try {
      Cart
        .findByPk(+req.params.id)
        .then(data => {
          !data ? next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' }) :
            data.UserId !== req.UserData.id ? next({ name: 'ForbiddenError' }) :
            next()
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }

  static authorizationWishlist(req, res, next) {
    try {
      Wishlist
        .findByPk(+req.params.id)
        .then(data => {
          !data ? next({ name: 'CustomError', statusCode: 404, message: 'Wishlist Not Found' }) :
            data.UserId !== req.UserData.id ? next({ name: 'ForbiddenError' }) :
            next()
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Auth