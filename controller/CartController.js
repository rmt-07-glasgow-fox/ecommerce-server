const { User, Cart, Product } = require ('../models/index')

class CartController {
  static async getCart (req, res, next) {
    try {
      if (+req.params.userId !== req.user) {
        return next ({name: 'Unauthorized access'})
      }
      let data = await Cart.findAll({
        attributes: ['id', 'productId', 'userId', 'quantity', 'status'],
        where: {
          userId: +req.params.userId
        },
        include: {
          model: Product
        }
      })
      res.status (200).json (data)
    } catch (err) {
      next(err)
    }
  }

  static async postCart (req, res, next) {
    try {
      if (+req.params.userId !== req.user) {
        return next ({name: 'Unauthorized access'})
      }
      let obj = {
        userId: +req.params.userId,
        productId: +req.body.productId,
        quantity: +req.body.quantity,
        status: true
      }
      let checkData = await Cart.findOne({
        where: {
          userId: obj.userId,
          productId: obj.productId
        }
      })
      if (!checkData) {
        let data = await Cart.create(obj)
        res.status (201).json (data)
      } else {
        next ({name: 'Product already added'})
      }
    } catch (err) {
      next(err)
    }
  }

  static async patchCart (req, res, next) {
    try {
      let obj = {
        quantity: req.body.quantity,
        status: req.body.status
      }
      let data = await Cart.update(obj, {
        where: {
         id: +req.params.cartId
        }
      })
      res.status (200).json (data)

    } catch (err) {
      next(err)
    }
  }

  static async deleteCart (req, res, next) {
    try {
      let data = await Cart.destroy({
        where: {
          id: req.params.cartId
        }
      })
      res.status (200).json ({message: 'Product deleted from cart'})

    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController