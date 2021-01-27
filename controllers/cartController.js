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
    const ProductId = +req.body.ProductId
    const quantity = +req.body.quantity
    const UserId = req.UserData.id
    let product = null

    Product
      .findOne({ // find to check stock
        where: { id: ProductId },
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      .then(data => {
        product = data
        return !data ?
          next({ name: 'CustomError', statusCode: 404, message: 'Product Not Found' }) :
        data && quantity > data.stock ?
          next({ name: 'CustomError', statusCode: 400, message: 'Out of stock!' }) :
          Cart.findOne({ where: { ProductId, UserId } }) // find to decide create or update
      })
      .then(data => {
        return !data ?
          Cart.create({ ProductId, quantity, UserId }) : // create
        data && data.quantity + quantity > product.stock ?
          next({ name: 'CustomError', statusCode: 400, message: 'Out of stock!' }) :
          Cart.update({ quantity: data.quantity + quantity }, {
            where: { id: data.id },
            returning: true
          })
      })
      .then(data => {
        if (data && data[1]) {
          const { id, UserId, ProductId, quantity } = data[1][0].dataValues
          res.status(200).json({ id, UserId, ProductId, quantity }) // update
        } else if (data && !data[1]) {
          const { id, UserId, ProductId, quantity } = data
          res.status(201).json({ id, UserId, ProductId, quantity }) // create
        } else {
          next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' })
        }
      })
      .catch(next)
  }

  static updateQty(req, res, next) {
    const quantity = +req.body.quantity
    const id = +req.params.id
    let cart = null
    Cart.findOne({
      where: { id }
    })
    .then(data => {
      cart = data
      return !data ?
        next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' }) :
        Product.findOne({ where: { id: data.ProductId } })
    })
    .then(product => {
      return !product ?
        next({ name: 'CustomError', statusCode: 404, message: 'Product Not Found' }) :
      cart.quantity + quantity > product.stock ?
        next({ name: 'CustomError', statusCode: 400, message: 'Out of stock!' }) :
        Cart.update({ quantity: cart.quantity + quantity },{
          where: { id },
          returning: true
        })
    })
    .then(data => {
      !data ?
        next({ name: 'CustomError', statusCode: 404, message: 'Cart Not Found' }) :
        res.status(200).json({
          id: data[1][0].dataValues.id,
          UserId: data[1][0].dataValues.UserId,
          ProductId: data[1][0].dataValues.ProductId,
          quantity: data[1][0].dataValues.quantity
        }) // update
    })
    .catch(next)
  }

  static delete(req, res, next) {
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