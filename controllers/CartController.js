const { Cart, CartItem, Product, User } = require('../models')

class CartController {
  static async addToCart(req, res, next) {
    try {
      let { ProductId } = req.body
      let cart = await Cart.findOne({where: {UserId: req.currentUser.id}})
      let product = await Product.findByPk(ProductId)

      if (!cart) {
        cart = await Cart.create({
          UserId: req.currentUser.id,
          total: +product.price
        })
      } else {
        cart.total += +product.price
        cart.save()
      }

      let cartItem = await CartItem.findOne({where: {CartId: cart.id, ProductId: product.id}})
      if (cart && !cartItem) {
        cartItem = await CartItem.create({
          CartId: cart.id,
          ProductId,
          quantity: 1
        })
      } else {
        cartItem.quantity += 1
        cartItem.save()
      }

      return res.status(200).json({cart, cartItem})
    } catch(error) {
      next(error)
    }
  }

  static async showCarts(req, res, next) {
    try {
      let cart = await Cart.findOne({
        where: {UserId: req.currentUser.id}
      })

      let cartItems = await CartItem.findAll({
        where: {CartId: cart.id},
        include: [{model: Product}]
      })

      return res.status(200).json({cart, cartItems})
    } catch(error) {
      next(error)
    }
  }

  static async checkout(req, res, next) {
    try {
      let cart = await Cart.findOne({
        UserId: req.currentUser.id
      })

      let cartItems = await CartItem.findAll({
        where: {CartId: cart.id},
        include: {model: Product}
      })

      cartItems.forEach(async (el) => {
        let product = await Product.findByPk(el.Product.id)
        product.stock -= el.quantity
        await product.save()
      })

      await cart.destroy()
      // res.status(200).json({cart, cartItems})
      res.status(200).json({msg: 'Checkout success'})
    } catch(error) {
      next(error)
    }
  }

}

module.exports = { CartController }