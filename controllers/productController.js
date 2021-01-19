const { Product } = require("../models")

class ProductController {
  static createProduct(req, res, next) {
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
        next(err)
      })
  }

  static getAllProduct(req, res, next) {
    Product.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateProduct(req, res, next) {
    let data = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      stock: req.body.stock,
      genre: req.body.genre,
    }
    let id = req.params.id
    Product.update(data, {
      where: { id }
    })
      .then(data => {
        if (!data) {
          return next({ name: "NotFound" })
        }
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteProduct(req, res, next) {
    let id = req.params.id
    Product.destroy({
      where: { id }
    })
      .then(data => {
        if (data == 0) {
          return next({
            name: "NotFound"
          })
        }
        res.status(200).json({ message: "Product successfully deleted" })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController