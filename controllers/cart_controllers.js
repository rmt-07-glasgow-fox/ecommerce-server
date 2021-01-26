const { Cart, User, Product } = require('../models')

class CartController {
  static createCart(req, res, next) {
    const { ProductId, quantity } = req.body
    let obj = {
      UserId: req.user.id,
      ProductId,
      quantity,
      isPaid: false,
      totalPrice: 0
    }
    Cart.create(obj)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static findCart(req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.user.id
      },
      include: Product
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = { CartController }