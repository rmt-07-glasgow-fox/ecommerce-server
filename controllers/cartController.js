const {Cart} = require("../models")
const {checkToken} = require('../helpers/jwt')

class cartController {
    static create(req, res, next) {
        const ProductId = req.body.ProductId
        const UserId = checkToken(req.headers.access_token).id
        Cart.create({ProductId, UserId})
          .then(cart => {
            const {id, ProductId, UserId, quantity} = cart
            res.status(201).json({id, ProductId, UserId, quantity})
          })
          .catch(err => {
            next(err)
          })
    }

    static getCarts(req, res, next) {
      const UserId = checkToken(req.headers.access_token).id
      Cart.findAll({include: 'Product', where: {UserId}})
      .then(carts => {
        const output = carts.map(el => {
          return { 
            id: el.id, 
            UserId: el.UserId,
            ProductId: el.ProductId,
            quantity: el.quantity,
            Product: {
                    id: el.Product.id,
                    name: el.Product.name,
                    imageUrl: el.Product.imageUrl,
                    price: el.Product.price,
                    stock: el.Product.stock
                }
            }
        })
        res.status(200).json(output)
      })
      .catch(err => {
        next(err)})
    }

    static getCart(req, res, next) {
      Cart.findOne({include: ['Product'], where: {id: +req.params.id}})
      .then(cart => {
        const {id, UserId, ProductId, quantity, Product} = cart
        res.status(200).json({id, UserId, ProductId, quantity, Product})
      })
      .catch(err => {
        next(err)})
    }

    static editCart(req, res, next) {
      const {quantity} = req.body
        Cart.update({quantity}, {where: {id: +req.params.id}})
          .then(cart => {
            res.status(200).json({message: "added!"})
          })
          .catch(err => {
            next(err)
          })
    }

    static deleteCart(req, res, next) {
      Cart.destroy({where: {id: +req.params.id}})
      .then(data => {
        res.status(200).json({message: 'delete cart successfull'})
      })
      .catch(err => next(err))
    }
}

module.exports = cartController