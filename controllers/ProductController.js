const { Product } = require('../models')

class ProductController {
  static getProducts(req, res, next) {
    Product.findAll({order: [['id', 'ASC']]})
      .then(products =>{
        return res.status(200).json(products)
      })
      .catch(err => {
        next(err)
      })
  }

  static createProduct(req, res, next) {
    const { name, image_url, price, stock, category } = req.body
    const newProduct = { name, image_url, price, stock, category }
   
    Product.create(newProduct)
      .then(product => {
        console.log('lah ini produk', product)
        return res.status(201).json(product)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static getProductById(req, res, next) {
    const id = +req.params.id

    Product.findByPk(id)
      .then(product => {
        if (!product) {
          next({ name: 'resourceNotFound' })
        } else {
          return res.status(200).json(product)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateProduct(req, res, next) {
    const id = +req.params.id
    const { name, image_url, price, stock, category } = req.body
    const updatedProduct = { name, image_url, price, stock, category }
    
    Product.update(updatedProduct,{ 
      where: { id }, 
      returning: true, plain: true
    })
      .then(product => {
        return res.status(200).json(product[1])
      })
      .catch(err => {
        next(err)
      })
  }

  static destroyProduct(req, res, next) {
    const id = +req.params.id

    Product.destroy({ where: { id } })
      .then(product => {
        if (!product) {
          next({ name: 'resourceNotFound' })
        } else {
          return res.status(200).json({ message: 'Product succesfully deleted'})
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = ProductController

