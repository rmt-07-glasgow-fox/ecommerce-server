const {CartList, Product, sequelize} = require("../models")
const {checkToken} = require("../helpers/jwt")

class CartController {
  static add(req, res, next) {
    const UserId = req.user.id
    const ProductId = req.body.ProductId

    CartList.findOne({where: {UserId, ProductId, status: 'unpaid'}, include: Product})
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

    CartList.findAll({where: {UserId, status: "unpaid"}, include: Product, order: [['createdAt', 'desc']]})
    .then(carts => {
      return res.status(200).json(carts)
    })
  }

  static allHistories (req, res, next) {
    const UserId = req.user.id

    CartList.findAll({where: {UserId, status: "paid"}, include: Product, order: [['createdAt', 'desc']]})
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
      return res.status(200).json({message: 'Successfully Decrease Quantity'})
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

  static async checkout (req,res,next) {
    let user = checkToken(req.headers.access_token)

    const t = await sequelize.transaction()
    try {
      const UserId = user.id
      const carts = await CartList.findAll({
        where: {
          UserId, status: 'unpaid'
        }
      },
      {
        transaction: t
      })
      for(const cart of carts) {
        const product = await Product.findByPk(cart.ProductId)
        if (cart.quantity > product.stock) {
          throw { msg: 'Your amount item is more than stock' }
        } else {
          let stock = product.stock - cart.quantity
          await Product.update({stock}, {where: {id: cart.ProductId}}, {transaction: t})
          await CartList.update({ status: 'paid' }, { where: { UserId, ProductId: cart.ProductId, status: 'unpaid' } })
        }
      }
      t.afterCommit(_ => {
          return res.status(200).json({ msg: 'Thank you, your transaction is done' })
      })
      await t.commit()
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }
}

module.exports = CartController