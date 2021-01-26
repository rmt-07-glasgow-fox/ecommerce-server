const { Cart, Product } = require('../models')

class CartController {
  static async addCart (req, res, next) {
    const ProductId = req.params.id
    const TransactionId = req.transaction
    const quantity = 1

    try {
      const cartfind = await Cart.findOne({
        where: {
          ProductId,
          TransactionId
        }
      })

      const product = await Product.findOne({
        where: {
          id: ProductId
        }
      })

      if (!cartfind) {

        if (quantity > product.stock) {
          throw {
            status: 400,
            message: `Cannot Add to Cart`
          }
        }

        const total = +quantity * +product.price
  
        const cart = await Cart.create({
          TransactionId,
          ProductId,
          quantity,
          total
        })
  
        res.status(200).json({cart})
      } else {

        const newquantity = cartfind.quantity + 1

        if (newquantity > product.stock) {
          throw {
            status: 400,
            message: `Cannot Add to Cart`
          }
        }

        const total = newquantity * +product.price
        const cart = await Cart.update({
            quantity: newquantity,
            total
          }, {
          where: {
            id: cartfind.id
          },
          returning: true
        })
  
        res.status(200).json({cart: cart[1][0]})
      }

    } catch (error) {
      next(error)
    }
  }

  static async editCart (req, res, next) {
    const id = req.params.id
    const quantity = req.body.quantity
    try {
      const cart = await Cart.findOne({
        where: {
          id
        },
        include: [{
          model: Product
        }]
      })
      
      if (+quantity > +cart.Product.stock) {
        throw {
          status: 400,
          message: `Cannot Add to Cart`
        }
      } else {
        if (quantity == 0) {
          const deleteCart = await Cart.destroy({
            where: {
              id
            }
          })

          res.status(200).json({message: `Product Has Been Removed From Cart`})
        } else {
          const total = +quantity * +cart.Product.price

          const updatedCart = await Cart.update({
            total,
            quantity
          }, {
            where: {
              id
            },
            returning: true
          })

          res.status(200).json({cart: updatedCart[1][0]})
        }
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async destroyCart (req, res, next) {
    const id = req.params.id
    try {
      const cart = await Cart.destroy({
        where: {
          id
        }
      })

      res.status(200).json({message: `Product Has Been Removed From Cart`})
    } catch (error) {
      next(error)
    }
  } 
}

module.exports = CartController