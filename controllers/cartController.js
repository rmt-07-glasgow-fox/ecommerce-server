const { User, Cart, Product } = require('../models')

class CartController {
  static async getAllCart(req, res, next) {
    const customerId = +req.user.id
    try {
      const cart = await Cart.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: {
          model: Product,
          attributes:['name', 'price', 'stock', 'image_url'],          
        },
        order: [['createdAt', 'ASC']],
        where: {
          UserId: customerId,
          status: false
        }
      })
      return res.status(200).json(cart)
    } catch (err) {
      next(err)
    }
  }

  static async addCart (req, res, next) {
    const customerId = +req.user.id
    const { id, quantity } = req.body
    try {
      const productCart = await Cart.findOne({
        where: {
          ProductId: id,
          UserId: customerId,
          status: false
        }
      })
      if (!productCart) {
        const product =  await Product.findByPk(id)
        if ( product.stock < quantity ) {
          throw { name: 'outOfStock' }
        }
        const addedProductToCart = await Cart.create({
          UserId: customerId,
          ProductId: id,
          quantity
        })
        return res.status(201).json(addedProductToCart)
      } else if (productCart.ProductId) {
        const cartQuantity = productCart.quantity
        const product =  await Product.findByPk(id)
        if ( product.stock < (quantity + cartQuantity) ) {
          throw { name: 'outOfStock' }
        } else {
          const updateProductInCart = await Cart.update({
            quantity: quantity + cartQuantity
          },
          { where: {
            ProductId: id,
            UserId: customerId,
            status: false
          },
          returning: true})
          const response = updateProductInCart[1][0]
          return res.status(200).json(response)
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    const customerId = +req.user.id
    const id = +req.params.id
    const { quantity, productId } = req.body
    try {
      const product =  await Product.findByPk(productId)
      if ( product.stock < quantity ) {
        throw { name: 'outOfStock' }
      }
      const updateProductInCart = await Cart.update({
        quantity
      },
      { where: {
        id,
        ProductId: product.id,
        UserId: customerId,
        status: false
      },
      returning: true})
      const response = updateProductInCart[1][0]
      return res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    const customerId = +req.user.id
    const id = +req.params.id
    try {
      const cart =  await Cart.findByPk(id)
      if (cart.UserId !== customerId) {
        return res.status(401).json({ message: 'This Product Cart not belongs to you'})
      } else {
        const deletedCart = await Cart.destroy({
          where: {
            id,
            UserId: cart.UserId,
            status: false
          }
        })
        if (!deletedCart) {
          throw { name: 'notFound' }
        } else {
          console.log(deletedCart)
          return res.status(200).json({ message: 'Product success removed from cart' })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async checkout (req, res, next) {
    const UserId = req.user.id
    try {
      const checkout = await Cart.update({
        status: true
      },
      { where: {
        UserId
      },
      returning: true})
      const checkoutResult = checkout[1]
      return res.status(200).json(checkoutResult)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController