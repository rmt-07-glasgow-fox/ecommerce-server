const { Product } = require('../models')

class ProductController {
  static async create(req, res, next) {
    try {
      const { name, image_url, price, stock } = req.body
      const obj = {
        name,
        image_url,
        price,
        stock
      }

      const product = await Product.create(obj)

      res.status(201).json(product)
    } catch(error) {
      next(error)
    }
  }
}

module.exports = { ProductController }