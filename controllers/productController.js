const { Product } = require('../models')

class ProductController {
  static create(req, res, next) {
    const { name, image_url, price, stock } = req.body
    Product.create({ name, image_url, price, stock })
      .then(product => {
        const { id, name, image_url, price, stock } = product
        res.status(201).json({ id, name, image_url, price, stock })
      })
      .catch(err => {
        const message = err.errors ? err.errors.map(e => e.message) : 'Internal Server Error'

        err.errors ? res.status(400).json({ message }) :
        res.status(500).json({ message })
      })
  }

  static update(req, res, next) {
    const { name, image_url, price, stock } = req.body
    Product
      .update({ name, image_url, price, stock }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(product => {
        if (!product[1][0]) res.status(404).json({ message: 'Product Not Found' })
        else {
          const { id, name, image_url, price, stock } = product[1][0].dataValues
          res.status(200).json({ id, name, image_url, price, stock })
        }
      })
      .catch(err => {
        const message = err.errors ? err.errors.map(e => e.message) : 'Internal Server Error'

        err.errors ? res.status(400).json({ message }) :
        res.status(500).json({ message })
      })
  }

  static delete(req, res, next) {
    Product
      .destroy({ where: { id: +req.params.id }, returning: true })
      .then(product => {
        product ?
          res.status(200).json({ message: 'Product success deleted!' }) :
          res.status(404).json({ message: 'Product Not Found' })
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }
}

module.exports = ProductController