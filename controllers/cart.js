const { Product, CartItem } = require('../models')

class cartController {

  static async addItem (req, res, next) {
    const user = req.user
    const { ProductId, quantity } = req.body

    try {
      const cart = await user.getCart()
      const hasProduct = await cart.hasProduct(+ProductId)

      if (!hasProduct) {
        const result = await cart.addProduct(ProductId, { through: { quantity } })

        res.status(201).json({ message: 'Product added to cart' })
      } else {
        const cartProduct = await cart.getProducts({ where: { id: ProductId } })
        if (cartProduct[0].CartItem.quantity + +quantity <= cartProduct[0].stock) {
          cartProduct[0].CartItem.quantity += +quantity
          const result = await cartProduct[0].CartItem.save()

          res.status(200).json({ message: 'Product added to cart' })
        } else {
          res.status(400).json({ message: 'Cannot add Product to cart' })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async getItems (req, res, next) {
    const user = req.user

    try {
      const cart = await user.getCart()
      const cartItems = await cart.getCartItems({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'CartId']
        },
        include: {
          model: Product,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
        }
      })

      res.status(200).json(cartItems)
    } catch (err) {
      next(err)
    }
  }

  static async updateItem (req, res, next) {
    const user =req.user
    const ProductId = req.params.productId
    const quantity = +req.body.quantity

    try {
      const cart = await user.getCart()
      const cartProduct = await cart.getProducts({ where: { id: ProductId } })

      if (cartProduct.length > 0) {
        if (cartProduct[0].stock >= quantity) {
          cartProduct[0].CartItem.quantity = quantity
          const result = await cartProduct[0].CartItem.save()

          res.status(200).json({ message: 'Cart has been updated' })
        } else {
          res.status(400).json({ message: 'Cannot update Cart' })
        }
      } else {
        next({ name: 'CartItemNotFound' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteItem (req, res, next) {
    const user =req.user
    const ProductId = req.params.productId

    try {
      const cart = await user.getCart()
      const cartProduct = await cart.getProducts({ where: { id: ProductId } })

      if (cartProduct.length > 0) {
        const result = await cartProduct[0].CartItem.destroy()

        res.status(200).json({ message: 'Product has been removed' })
      } else {
        next({ name: 'CartItemNotFound' })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = cartController
