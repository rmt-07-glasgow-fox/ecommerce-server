const { Cart, CartItem, Product } = require('../models')

class CartItemController {
  static async setQuantity(req, res, next) {
    try {
      let { CartItemId, ProductPrice, quantity } = req.body
      let cartItem = await CartItem.findByPk(CartItemId)
      let cart = await Cart.findOne({where: {UserId: req.currentUser.id}})

      // set quantity product in cart item
      cartItem.quantity = quantity
      await cartItem.save()

      // set total price in cart
      // const totalPrice = ProductPrice * cartItem.quantity
      // cart.total += totalPrice
      let cartItems = await CartItem.findAll({
        where: {CartId: cart.id},
        include: [{model: Product}]
      })

      cart.total = 0
      cartItems.forEach((el) => {
        console.log(el.quantity, el.Product.price)
        cart.total += el.quantity * el.Product.price
      })
      console.log(cart.total)
      await cart.save()

      return res.status(200).json({total: cart.total})
    } catch(error) {
      next(error)
    }
  }

  static async deleteCartItem(req, res, next) {
    try {
      let { CartItemId, ProductId, quantity } = req.body
      let cart = await Cart.findOne({where: {UserId: req.currentUser.id}})
      let product = await Product.findByPk(ProductId)
      let cartItem = await CartItem.findByPk(CartItemId)
      // const decreaseTotal = product.price * quantity

      // cart.total -= decreaseTotal
      await cartItem.destroy()

      let cartItems = await CartItem.findAll({
        where: {CartId: cart.id},
        include: [{model: Product}]
      })


      cart.total = 0
      cartItems.forEach((el) => {
        console.log(el.quantity, el.Product.price)
        cart.total += el.quantity * el.Product.price
      })

      await cart.save()
      res.status(200).json({message: 'Deleted product from your cart success', total: cart.total})
    } catch(error) {
      next(error)
    }
  }

}

module.exports = { CartItemController }