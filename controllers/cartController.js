const { Cart, Product } = require('../models')

class CartController {
  static findAll(req, res, next) {
    Cart
      .findAll({
        attributes: ['id', 'quantity', 'UserId'],
        include: [
          {
            model: Product,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ]
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findByCust(req, res, next) {
    Cart
      .findAll({
        where: { UserId: req.UserData.id },
        attributes: ['id', 'quantity'],
        include: [
          {
            model: Product,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ]
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const { ProductId, quantity } = req.body
    const UserId = req.UserData.id
    Cart
      .findOne({
        where: { ProductId }
      })
      .then(data => {
        return !data ? Cart.create({ ProductId, quantity, UserId }) :
        Cart.update({ quantity }, {
          where: { ProductId }
        })
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static updateQty(req, res, next) {
    const { quantity } = req.body
    Cart
      .update({ quantity }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(data => {
        if (!data[1][0]) next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' })
        else {
          const { id, quantity } = data[1][0].dataValues
          res.status(200).json({ id, quantity })
        }
      })

  }

  static delete(req, res, next) {
    console.log(req.params.id);
    Cart
      .destroy({
        where: { id: +req.params.id },
        returning: true
      })
      .then(data => {
        data ?
          res.status(200).json({ message: 'Cart success deleted!' }) :
          next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' })
      })
      .catch(next)
  }
  
}

module.exports = CartController