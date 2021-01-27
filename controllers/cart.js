const { User, Cart, Product } = require('../models')

class CartController {
  static async showAll(req,res,next){
    try {
      const UserId = req.user.id
      const carts = await Cart.findAll({
        where: {
          status: false,
          UserId
        },
        include: [Product]
      })
      res.status(200).json(carts)
    } catch (err) {
      next(err)
    }
  }

  static async create(req,res,next){
    try {
      const UserId = req.user.id
      const { ProductId } = req.body
      const cart = await Cart.findOne({
        where: {
          status: false,
          UserId,
          ProductId
        }
      })
      if (cart) {
        const cartUpdate = await Cart.update({quantity: cart.quantity+1}, {
          where: { id: cart.id },
          returning: true
        })
        res.status(200).json(cartUpdate[1][0])
      } else {
        const cartAdd = await Cart.create({
          UserId,
          ProductId
        })
        res.status(201).json(cartAdd)
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateStatus(req,res,next){
    try {
      const UserId = req.user.id
      const cart = await Cart.update({ status: true }, {
        where: {UserId},
        returning: true
      })
      res.status(200).json(cart[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async updateQuantity(req,res,next){
    try {
      const { id } = req.params
      const { quantity } = req.body
      const cart = await Cart.update({quantity},{
        where: {id},
        returning: true
      })
      res.status(200).json(cart[1][0])
    } catch (err) {
      next()
    }
  }

  static async delete(req,res,next){
    try {
      const { id } = req.params
      const cart = await Cart.destroy({where: {id}})
      if(cart) res.status(200).json({ message: 'successfully delete cart' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController