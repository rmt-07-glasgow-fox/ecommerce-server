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
  static getProduct(req, res, next) {
    Product.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }
  static getOneProduct(req, res, next) {
    const id = +req.params.id
    Product.findByPk(id)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        next({ name: 'notFound' })
      }
    })
    .catch(err => {
      next(err)
    })
  }
  static update(req, res, next) {
    const id = +req.params.id
    const newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    }
    Product.update(newProduct, {
      where: { id },
      returning: true
    })
    .then(data => {
      if(data[0] === 0) {
        next({ name: 'notFound' })
      } else {
        res.status(200).json(data[1][0])
      }
    })
    .catch(err => {
      next(err)
    })
  }
  static delete(req,res, next) {
    const id = +req.params.id
    Product.destroy({
      where: { id }
    })
    .then(data => {
      if(data === 1) {
        res.status(200).json({
          message: 'Product success to delete'
        })
      } else {
        next({ name: 'notFound'})
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = productController