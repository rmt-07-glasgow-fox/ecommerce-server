const { Cart, Product } = require('../models')

class Controller {
  static async readCart (req, res) {
    try {
      const data = await Cart.findAll({
          where: { UserId: req.user.id },
          include: [{
          model: Product,
        }]
      })
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  static async createCart (req, res) {
    const UserId = req.user.id
    const ProductId = req.params.id
    const quantity = 1
    const data = await Product.findOne({
      where: { id: UserId }
    })
    const cost = data.price * quantity
    try {
      const data = {
        UserId,
        ProductId,
        quantity,
        cost
      }
      const create = await Cart.create(data)
      res.status(200).json(create)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  static async editQuantity (req, res) {
    const quantity = req.body.quantity
    const cartId = req.params.id
    try {
      // search id
      const data = await Cart.findOne({
        where: { id: cartId },
        include: [{
          model: Product
        }]
      })
      
      // update cost on cart
      const cost = data.price * quantity
      
      // input to variabeli
      const update = {
        UserId: data.UserId,
        ProductId: data.ProductId,
        quantity,
        cost
      }
      const edit = await Cart.update(update, {
        where: { id: cartId }
      })

      console.log(data.quantity, 'sebelom')
      console.log(quantity, 'sesudah ====')

      res.status(200).json(edit)

    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = Controller