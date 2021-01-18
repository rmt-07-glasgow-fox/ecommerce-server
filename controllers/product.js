const { Product, User } = require('../models')

class ProductController {
  static async create(req,res,next){
    try {
      const { name, image_url, price, stock } = req.body
      const UserId = req.user.id
      const input = {
        name: name || '',
        image_url: image_url || '',
        price: +price,
        stock: +stock,
        UserId
      }
      const product = await Product.create(input)
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController