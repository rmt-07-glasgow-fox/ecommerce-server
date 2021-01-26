const { Cart, Product, User } = require('../models/')


class CartController {
  // for history
  static fetchAllCarts (req, res, next) {

  }

  // for carts page
  static fetchOneCart (req, res, next) {
    const cartId = +req.params.cartId

    Cart.findByPk(cartId, {
      include: [{
        model: Product, attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }, {
        model: User, attributes: {
          exclude: ['createdAt', 'updatedAt', 'password', 'role']
        }
      }
      ]
    })
      .then((foundCart) => {
        if (!foundCart) {
          next({ name: 'ResourceNotFound' })
        }
        res.status(200).json(foundCart)
      })
      .catch(next)
  }

  // for when we click on a button Add to cart
  static async addToCart (req, res, next) {
    const UserId = req.user.id
    const { ProductId, quantity } = req.body

    let currentCart
    let productStock = 0

    try {

      const product = await Product.findOne({
        where: {
          id: ProductId
        }
      })

      if (product.stock >= quantity) {
        productStock = product.stock
        currentCart = await Cart.findOne({
          where: {
            ProductId,
            UserId
          }
        })
      } else {
        next({ name: 'StockExceeded' })
      }

      if (!currentCart) {
        let newCart = await Cart.create({
          UserId,
          ProductId,
          quantity: +quantity
        })
        const message = ['Product added']
        res.status(201).json({ message })
      } else {
        const newQuantity = Number(currentCart.quantity) + Number(quantity)
        if (newQuantity <= productStock) {
          let updatedCart = await currentCart.update({
            quantity: newQuantity
          })
          const message = ['Product added']
          res.status(200).json({ message })
        } else {
          next({ name: 'StockExceeded' })
        }
      }

    } catch (err) {
      next(err)
    }
  }

  // update a cart
  static updateCart (req, res, next) {

  }

  // for when we want to cancel a cart
  static removeCart (req, res, next) {

  }
}

module.exports = CartController
