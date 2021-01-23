const { Product } = require('../models')

class ProductController {
  static findAll(req, res, next) {
    Product
      .findAll()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static findByPk(req, res, next) {
    Product
      .findByPk(+req.params.id)
      .then(product => {
        product ? res.status(200).json(product) :
        res.status(404).json({ message: 'Product Not Found' })
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static create(req, res, next) {
    const { name, image_url, price, stock, CategoryId } = req.body
    Product.create({ name, image_url, price, stock, CategoryId })
      .then(product => {
        const { id, name, image_url, price, stock, CategoryId } = product
        res.status(201).json({ id, name, image_url, price, stock, CategoryId })
      })
      .catch(err => {
        const message = err.errors ? err.errors.map(e => e.message) : 'Internal Server Error'

        err.errors ? res.status(400).json({ message }) :
        res.status(500).json({ message })
      })
  }

  static update(req, res, next) {
    const { name, image_url, price, stock, CategoryId } = req.body
    Product
      .update({ name, image_url, price, stock, CategoryId }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(product => {
        if (!product[1][0]) res.status(404).json({ message: 'Product Not Found' })
        else {
          const { id, name, image_url, price, stock, CategoryId } = product[1][0].dataValues
          res.status(200).json({ id, name, image_url, price, stock, CategoryId })
        }
      })
      .catch(err => {
        const message = err.errors ? err.errors.map(e => e.message) : 'Internal Server Error'

        err.errors ? res.status(400).json({ message }) :
        res.status(500).json({ message })
      })
  }

  static updateStock(req, res, next) {
    const { stock } = req.body
    Product
      .update({ stock }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(product => {
        if (!product[1][0]) res.status(404).json({ message: 'Product Not Found' })
        else {
          const { id, stock } = product[1][0].dataValues
          res.status(200).json({ id, stock })
        }
      })
      .catch(err => {
        console.log(err, '??')
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