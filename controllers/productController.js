const { Product } = require("../models")

class ProductController {
  static createProduct (req, res, next) {
    let data = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      stock: req.body.stock,
      genre: req.body.genre,
    }
    Product.create(data)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }

  static getAllProduct (req, res, next) {
    Product.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController