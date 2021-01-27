const { Cart, CartItem, Product } = require('../models')

class CartController {
  static async addToCart(req, res, next) {
    try {
      // console.log('AAAAA', Cart);
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
        where: {UserId: req.currentUser.id},
        include: CartItem
      })

      return res.status(200).json(cart)
    } catch(error) {
      next(error)
    }
  }

}

module.exports = { CartController }