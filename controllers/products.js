const { Product } = require('../models')

class productsController {

  static create (req, res, next) {
    const { name, description, category, image_url, price, stock } = req.body
    const payload = { name, description, category, image_url, price, stock }

    Product
      .create(payload)
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static updateProduct (req, res, next) {
    const { name, description, category, image_url, price, stock } = req.body
    const id = req.params.productId

    Product.findByPk(id)
      .then(product => {
        if (product) {
          product.name = name
          product.description = description
          product.category = category
          product.image_url = image_url
          product.price = price
          product.stock = stock

          return product.save()
        } else {
          return next({ name: 'ProductNotFound' })
        }
      })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static deleteProduct (req, res, next) {
    const id = req.params.productId

    Product.findByPk(id)
      .then(product => {
        if (product) {
          return product.destroy()
        } else {
          return next({ name: 'ProductNotFound' })
        }
      })
      .then(() => {
        res.status(200).json({ message: 'Product deleted successfully'})
      })
      .catch(next)
  }

  static getAllProducts (req, res, next) {
    Product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      order: ['id']
    })
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static getProduct (req, res, next) {
    const id = req.params.productId

    Product.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      .then(product => {
        if (product) {
          res.status(200).json(product)
        } else {
          return next({ name: 'ProductNotFound' })
        }
      })
      .catch(next)
  }
}

module.exports = productsController
