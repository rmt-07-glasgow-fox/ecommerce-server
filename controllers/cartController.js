const { Cart, User, Product } = require('../models')

class CartController {

  static async addCart(req, res, next) {
    try {
      let UserId = +req.user.id
      let ProductId = +req.body.ProductId
      let quantity = +req.body.quantity
      let totalPrice = +req.body.totalPrice

      console.log('>>> req.body : ', req.body)
      console.log('>>> req.user : ', req.user)
      console.log('>>> create cart : ', { ProductId, quantity, totalPrice })

      if (!ProductId || !quantity || !totalPrice) { return next({ name: 400, message: 'ProductId / quantity / totalPrice is required' }) }

      // check productId
      let dbProduct = await Product.findByPk(ProductId)
      // console.log('>>> check product', dbProduct)
      if (!dbProduct) { return next({ name: 404, message: 'product not found' }) }

      // check stock
      if (dbProduct.stock < quantity) { return next({ name: 400, message: `please order below current stock ${dbProduct.stock}` }) }

      let newCart = {
        UserId: UserId,
        ProductId: ProductId,
        quantity: quantity,
        totalPrice: totalPrice
      }

      // check in cart, if avail plus the quantity and totalPrice
      let dbCart = await Cart.findOne({ where: { UserId: UserId, ProductId: ProductId } })
      console.log('>>> dbCart  ', dbCart)

      // update dbCart
      if (dbCart) {
        let updatedQuantity = quantity + dbCart.quantity
        let updatedTotalPrice = totalPrice + dbCart.totalPrice

        // check stock
        if (updatedQuantity > dbProduct.stock) {
          return next({ name: 400, message: `please order below current stock ${dbProduct.stock}` })
        }

        let updatedDBCart = await Cart.update({ quantity: updatedQuantity, totalPrice: updatedTotalPrice }, { where: { id: dbCart.id } })
        console.log('>>> updated cart', updatedDBCart)
        return res.status(200).json({ message: `${dbProduct.name} is added to cart` })
      }

      // createCart
      if (!dbCart) {

        let createdCart = await Cart.create(newCart)
        console.log('>>> createdCart', createdCart)

        return res.status(201).json({ message: `${dbProduct.name} is added to cart` })
      }

      console.log('>>> check addCart flow control salah')

    } catch (err) {
      return next(err)
    }
  }

  static async getAllCart(req, res, next) {
    try {

      let allCart = await Cart.findAll({
        where: { UserId: req.user.id },
        order: [['id']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
          model: Product,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: User,
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
        }]
      })

      return res.status(200).json(allCart)

    } catch (err) {
      return next(err)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      let idCart = +req.params.id

      // check cart is avail
      let cart = await Cart.findByPk(idCart)

      if (!cart) {
        return next({ name: 404, message: 'Cart is not found' })
      }

      if (cart.UserId !== req.user.id) {
        return next({ name: 401 })
      }

      await Cart.destroy({ where: { id: idCart } })

      return res.status(200).json({ message: 'Cart is deleted' })

    } catch (err) {
      return next(err)
    }
  }

  static async updateQuantity(req, res, next) {
    try {
      let idCart = +req.params.id
      let updatedQuantity = +req.body.quantity

      // validate quantity
      if (!updatedQuantity) { return next({ name: 400, message: 'quantity is required and should higher than 0' }) }

      // check cart is avail
      let cart = await Cart.findByPk(idCart)

      if (!cart) { return next({ name: 404, message: 'Cart is not found' }) }
      if (cart.UserId !== req.user.id) { return next({ name: 401 }) }

      // check productId
      let dbProduct = await Product.findByPk(cart.ProductId)
      console.log('>>> dbProduct', dbProduct)

      if (!dbProduct) { return next({ name: 404, message: 'product not found' }) }
      if (dbProduct.stock < updatedQuantity) { return next({ name: 400, message: `please order below current stock ${dbProduct.stock}` }) }

      console.log('>>> berhasil dong !!')

      let updatedCart = await Cart.update({ quantity: updatedQuantity }, { where: { id: idCart } })
      return res.status(200).json({ message: `Cart ${dbProduct.name} quantity is updated to ${updatedQuantity}` })

    } catch (err) {
      return next(err)
    }
  }

}

module.exports = CartController