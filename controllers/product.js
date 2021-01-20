const { Product } = require('../models/')

class ProductController {
  static create(req, res, next) {
    const { name, image_url, price, stock } = req.body
    Product.create({
      name,
      image_url,
      price,
      stock
    })
      .then((product) => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { stock, price, name, image_url } = req.body
    const id = +req.params.id

    Product.findByPk(id)
      .then(product => {
        return product.update({
          stock,
          price,
          name,
          image_url
        })
      })
      .then(updatedProduct => {
        res.status(200).json(updatedProduct)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const id = +req.params.id

    Product.findByPk(id)
      .then(() => {
        const confirmDelete = [
          'Product deleted'
        ]

        res.status(200).json({ confirmDelete })
      })
      .catch(next)
  }

  static fetchAll(req, res, next) {
    Product.findAll()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static fetchById(req, res, next) {
    const id = +req.params.id
    Product.findByPk(id)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }
}

module.exports = ProductController
