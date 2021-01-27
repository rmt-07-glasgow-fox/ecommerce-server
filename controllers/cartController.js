const { User, Cart, Product } = require('../models')

class CartController {
  static async getAllCart(req, res, next) {
    const customerId = req.user.id
    try {
      const cart = await Cart.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: {
          model: Product,
          attributes:['name', 'price', 'stock'],          
        },
        order: [['createdAt', 'ASC']],
        where: {
          customerId
        }
      })
      // const response = {

      // }
      return res.status(200).json(cart)
    } catch (err) {
      next(err)
    }

    
  }


}

module.exports = CartController