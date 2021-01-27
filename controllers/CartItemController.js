const { Cart, CartItem } = require('../models')

class CartItemController {
  static async setQuantity(req, res, next) {
    try {
      let { CartItemId, quantity } = req.body
      let cartItem = await CartItem.findByPk(CartItemId)
      cartItem.quantity = quantity
      cartItem.save()

      return res.status(200).json({msg: 'Quantity updated'})
    } catch(error) {
      next(error)
    }
  }

  static async deleteCartItem(req, res, next) {
    try {
      let { CartItemId } = req.body
      let cartItem = await CartItem.findByPk(CartItemId)

      cartItem.destroy()
      res.status(200).json({message: 'Deleted product from your cart success'})
    } catch(error) {
      next(error)
    }
  }

}

module.exports = { CartItemController }