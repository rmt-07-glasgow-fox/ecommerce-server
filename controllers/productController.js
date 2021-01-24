const { Product } = require('../models')

class ProductController {
  static findAll(req, res, next) {
    Product
      .findAll({
        include: ['Category']
      })
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static findByPk(req, res, next) {
    Product
      .findByPk(+req.params.id, {
        include: ['Category']
      })
      .then(product => {
        product ? res.status(200).json(product) :
        next({ name: 'NotFoundError' })
      })
      .catch(next)
  }

  static create(req, res, next) {
    const { name, image_url, price, stock, CategoryId } = req.body
    Product.create({ name, image_url, price, stock, CategoryId })
      .then(product => {
        const { id, name, image_url, price, stock, CategoryId } = product
        res.status(201).json({ id, name, image_url, price, stock, CategoryId })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { name, image_url, price, stock, CategoryId } = req.body
    Product
      .update({ name, image_url, price, stock, CategoryId }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(product => {
        if (!product[1][0]) next({ name: 'NotFoundError' })
        else {
          const { id, name, image_url, price, stock, CategoryId } = product[1][0].dataValues
          res.status(200).json({ id, name, image_url, price, stock, CategoryId })
        }
      })
      .catch(next)
  }

  static updateStock(req, res, next) {
    const { stock } = req.body
    Product
      .update({ stock }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(product => {
        if (!product[1][0]) next({ name: 'NotFoundError' })
        else {
          const { id, stock } = product[1][0].dataValues
          res.status(200).json({ id, stock })
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Product
      .destroy({ where: { id: +req.params.id }, returning: true })
      .then(product => {
        product ?
          res.status(200).json({ message: 'Product success deleted!' }) :
          next({ name: 'NotFoundError' })
      })
      .catch(next)
  }
}

module.exports = ProductController