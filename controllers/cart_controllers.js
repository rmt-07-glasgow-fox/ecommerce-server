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

  static updateCart(req, res, next) {
    const id = +req.params.id
    let { quantity, totalPrice, isPaid } = req.body
    if (!isPaid) {
      isPaid = false
    }
    let obj = {
      quantity,
      totalPrice,
      isPaid
    }
    Cart.update(obj, {
      where: {
        id
      }
    })
      .then(data => {
          return Cart.findByPk(id) 
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static destroyCart(req, res, next) {
    const id = +req.params.id
    Cart.destroy({
        where: {
            id
        }
    })
    .then(data => {
        if (!data) {
            next({ name: 'Data Not Found'})
        } else {
            res.status(200).json({message: 'Cart Has Been Succesfully Deleted'})
        }
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
}
}

module.exports = { CartController }