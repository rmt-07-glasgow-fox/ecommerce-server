const { Cart, Product } = require('../models')

class Controller {
  static async readCart (req, res) {
    try {
      const data = await Cart.findAll({
        where: { UserId: req.user.id },
        include: [{
        model: Product,
        }],
        order: [['createdAt', 'DESC']]
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
      if (!data) {
        res.status(404).json({
          msg: 'data is undefined'
        })
      } else {
        // update cost on cart
        const cost = data.Product.price * quantity
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
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
  static async deleteCart (req, res) {
    const id = req.params.id
    console.log(id, '========= id');
    try {
      const data = await Cart.findOne({
        where: { id },
        include: [{
          model: Product
        }]
      })
      if (data) {
        const remove = await Cart.destroy({
          where: { id }
        })
        res.status(200).json({
          msg: 'Data was deleted'
        })
      } else {
        res.status(404).json({
          msg: 'Data is undefinded'
        })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = Controller