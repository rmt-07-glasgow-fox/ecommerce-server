const {CartList, Product} = require("../models")

class CartController {
  static add(req, res, next) {
    const UserId = req.user.id
    const ProductId = req.body.ProductId

    CartList.findOne({where: {UserId, ProductId}, include: Product})
    .then(data => {
      if (!data) {
        return CartList.create({UserId, ProductId})
        .then(cart => {
          // const {id, UserId, ProductId, quantity, status} = cart
          return res.status(201).json(cart)
        })
        .catch(next)
      } else {
        const updateQuantity = {
          quantity: data.quantity + 1
        }
        return CartList.update(updateQuantity, {where: {id: data.id}})
        .then(cart => {
          const {id, UserId, ProductId, quantity, status} = cart
          return res.status(200).json({message: 'Current Cart Added'})
        })
        .catch(next)
      }
    })
    .catch(console.log)
  }

  static allCarts (req, res, next) {
    const UserId = req.user.id

    CartList.findAll({where: {UserId}, include: Product, order: [['createdAt', 'desc']]})
    .then(carts => {
      return res.status(200).json(carts)
    })
  }

  static quantityPlus(req, res, next) {
    const id = req.params.id

    CartList.findByPk(id, {attributes: {exclude: ['createdAt', 'updatedAt']}})
    .then(cart => {
      const updateQuantity = {
        quantity: cart.quantity + 1
      }
      return CartList.update(updateQuantity, {where: {id: cart.id}})
    })
    .then(() => {
      return res.status(200).json({message: 'Successfully Increase Quantity'})
    })
    .catch(next)
  }

  static quantitMin(req, res, next) {
    const id = req.params.id

    CartList.findByPk(id, {attributes: {exclude: ['createdAt', 'updatedAt']}})
    .then(cart => {
      const updateQuantity = {
        quantity: cart.quantity - 1
      }
      return CartList.update(updateQuantity, {where: {id: cart.id}})
    })
    .then(() => {
      return res.status(200).json({message: 'Successfully Increase Quantity'})
    })
    .catch(next)
  }

  static delete(req, res, next) {
    const id = +req.params.id

    CartList.destroy({where: {id}})
    .then(cart => {
      res.status(200).json({message: `Deleted Successfully`})
    })
    .catch(next)
  }

  // static put(req, res, next) {
  //   const id = +req.params.id

  //   CartList.findByPk(id)
  //   .then(cart => {

  //     res.status(200).json({message: `Deleted Successfully`})
  //   })
  //   .catch(next)
  // }
}

module.exports = CartController