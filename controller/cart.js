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
    
    const dataCart = await Cart.findOne({ where: { ProductId }})
    const dataProduct = await Product.findOne({ where: { id: ProductId }})
    try {
      if (!dataCart) {
        // kalo ga ada data cart nya harus ngebuat cart baru
        let quantity = 1
        let data = {
          UserId,
          ProductId,
          quantity,
          cost: dataProduct.price * quantity
        }
        const createCart = await Cart.create(data)
        let stock = dataProduct.stock - 1
        const dataUpdate = {
          name: dataProduct.name,
          image_url: dataProduct.image_url,
          price: dataProduct.price,
          stock
        }
        const updateProduct = await Product.update(dataUpdate, { where: { id: ProductId}})
        res.status(201).json(createCart)
      } else {
        // kalo ada cart nya kita edit quantity aja
        let quantity = dataCart.quantity + 1
        const editCart = {
          UserId,
          ProductId,
          quantity: dataCart.quantity+=1,
          cost: dataProduct.price * quantity
        }
        const newCart = await Cart.update(editCart, { where: { ProductId }})
        let stock = dataProduct.stock - 1
        const editProduct = {
          name: dataProduct.name,
          image_url: dataProduct.image_url,
          price: dataProduct.price,
          price: dataProduct.price,
          stock
        }
        const newProduct = await Product.update(editProduct, { where: { id: ProductId}})
        res.status(200).json(newCart)
      }
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
        res.status(200).json(edit)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
  static async deleteCart (req, res) {
    const id = req.params.id
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