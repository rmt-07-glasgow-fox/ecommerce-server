const { Cart } = require('../models')

class Controller {

  static getUserCarts (req, res, next) {
    let id = req.headers.userId
    Cart.findAll({ where: { UserId: id }, include: 'Product', order: [['createdAt']] })
    .then(cart => {
      res.status(200).json(cart)
    })
    .catch(err => {
      console.log(err)
    })
  }

  static createCart (req, res, next) {
    console.log('in controller')
    let UserId = req.headers.userId
    let ProductId = req.params.productId
    Cart.create({ UserId, ProductId })
    .then(cart => {
      res.status(201).json(cart)
    })
    .catch(err => {
      console.log(err)
    })
  }

  static updateCart (req, res, next) {
    let UserId = req.headers.userId
    let ProductId = req.params.productId
    let operator = req.body.operator
    let productQty = req.body.quantity
    Cart.findOne({ where: { UserId: UserId, ProductId: ProductId }})
    .then(cart => {
      if (cart) {
        if (operator == '+') {
          cart.quantity = cart.quantity + productQty
        } else if (operator == '-') {
          cart.quantity = cart.quantity - productQty
        }
        return Cart.update({ quantity: cart.quantity }, { where: { UserId: UserId, ProductId: ProductId }, returning: true})
      } else {
        throw ({ name: 404})
      }
    })
    .then(cart => {
      res.status(200).json(cart[1][0])
    })
    .catch(err => {
      console.log(err)
    })
  }

  static removeCartItem (req, res, next) {
    let UserId = req.headers.userId
    let ProductId = req.params.productId
    Cart.destroy({ where: { UserId: UserId, ProductId: ProductId }})
    .then(() => {
      res.status(200).json({ message: 'delete success' })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = Controller;