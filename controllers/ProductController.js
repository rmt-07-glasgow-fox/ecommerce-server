const { Product, User } = require('../models')

class ProductController {
  static postProduct(req, res, next) {
    const newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.create(newProduct)
      .then(product => {
        res.status(201).json(product)
      })
      .catch(err => {
        if(err.errors[0].path === 'name') {
          next({name: 'name'})
        } else if(err.errors[0].path === 'price') {
          next({name: 'price'})
        } else if(err.errors[0].path === 'stock') {
          next({name: 'stock'})
        } else {
          next(err)
        }
      })
  }

  static getProduct(req, res, next) {

  }
}

module.exports = ProductController