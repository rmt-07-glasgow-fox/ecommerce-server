const { Product } = require('../models')

class Controller {

  static createProduct (req, res, next) {
    let { name, img_url, price, stock } = req.body
    Product.create({ name, img_url, price, stock })
    .then(product => {
      res.status(201).json(product)
    })
    .catch(err => {
      next(err)
    })
  }

  static getAllProducts (req, res, next) {
    Product.findAll()
    .then(products => {
      if (products) {
        res.status(200).json(products)
      } else {
        throw ({ name: 404 })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateProduct (req, res, next) {
    let id = req.params.id
    let { name, img_url, price, stock } = req.body
    Product.update({ name, img_url, price, stock }, {where: {id: id}, returning: true})
    .then(product => {
      res.status(200).json(product[1][0])
    })
    .catch(err => {
      next(err)
    })
  }
  
  static deleteProduct (req, res, next) {
    let id = req.params.id
    console.log(id)
    Product.destroy({where: {id: id}})
    .then(() => {
      res.status(200).json({message: 'Task Deleted'})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller;