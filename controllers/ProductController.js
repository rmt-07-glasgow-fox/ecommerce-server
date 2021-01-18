const { Product, User } = require('../models')

class ProductController {
  static getProducts(req, res, next) {
    Product.findAll()
      .then(products =>{
        return res.status(200).json(products)
      })
      .catch(err => {
        next(err)
      })
  }

  static createProduct(req, res, next) {
    const { name, image_url, price, stock } = req.body
    const newProduct = { name, image_url, price, stock }

    Product.create(newProduct)
      .then(product => {
        return res.status(201).json(product)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateProduct(req, res, next) {
    const id = +req.params.id
    const { name, image_url, price, stock } = req.body
    const updatedProduct = { name, image_url, price, stock }

    Product.update(updatedProduct,{ 
      where: { id }, 
      returning: true, plain: true
    })
      .then(product => {
        if(!product) {
          next({ name: 'accessDenied' })
        }
        return res.status(200).json(product[1])
      })
      .catch(err => {
        next(err)
      })
      
  }

  static destroyProduct(req, res, next) {

  }

}

module.exports = ProductController

