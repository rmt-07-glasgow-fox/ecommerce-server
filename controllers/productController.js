const { Product } = require('../models')

class productController {
  static createProduct(req, res, next) {
    const newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    }
    Product.create(newProduct)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = productController