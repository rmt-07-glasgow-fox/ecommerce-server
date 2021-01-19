const { Product, User } = require('../models')

class ProductController {
  static postProduct(req, res, next) {
    const newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      UserId: req.user.id
    }

    Product.create(newProduct)
      .then(product => {
        if(req.user.role === 'admin') {
          res.status(201).json(product) 
        } else {
          next({name: 'unauthorized'})
        }
      })
      .catch(err => {
        if(err.errors[0].path === 'name') {
          next({name: 'name'})
        } else if(err.errors[0].path === 'price') {
          next({name: 'price'})
        } else if(err.errors[0].path === 'stock') {
          next({name: 'stock'})
        } else if(err.message === 'invalid input syntax for type integer: "string"') {
          next({name: 'mustInteger'})
        } else {
          next(err)
        }
      })
  }

  static getProduct(req, res, next) {
    Product.findAll({
      include: User,
    })
    .then(products => {
      if(req.user.role === 'admin') {
        products ? res.status(200).json({products}) : next({name: 'notFound'})
      } else {
        next({name: 'unauthorized'})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static putProductById(req, res, next) {
    const productId = +req.params.id

    const updatedProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.update(updatedProduct, {
      where: {
        id: productId
      },
      returning: true
    })
      .then(product => {
        if(req.user.role === 'admin') {
          res.status(200).json(product)
        } else {
          next({name: "unauthorized"})
        }
      })
      .catch(err => {
        if(err.errors[0].path === 'name') {
          next({name: 'name'})
        } else if(err.errors[0].path === 'price') {
          next({name: 'price'})
        } else if(err.errors[0].path === 'stock') {
          next({name: 'stock'})
        } else if(err.message === 'invalid input syntax for type integer: "string"') {
          next({name: 'mustInteger'})
        } else if(err.name === 'SequelizeDatabaseError'){
          next({name: 'mustInteger'})
        } else {
          next(err)
        }
      })
  }


  static patchProductById(req, res, next) {
    const productId = +req.params.id

    const updatedProduct = {
      name: req.body.name
    }
    
    Product.update(updatedProduct, {
      where: {
        id: productId
      },
      returning: true
    })
      .then(product => {
        if(req.user.role === 'admin') {
          res.status(200).json(product)
        } else {
          next({name: 'unauthorized'})
        }
      })
      .catch(err => {
        if(err.errors[0].path === 'name') {
          next({name: 'name'})
        } else {
          next(err)
        }
      })
  }

  static deleteProductById(req, res, next) {
    const productId = +req.params.id

    Product.destroy({
      where: {
        id: productId
      }
    })
    .then(product => {
      if(req.user.role === 'admin') {
        res.status(200).json({message: 'Product has been deleted'})
      } else {
        next({name: 'unauthorized'})
      }
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = ProductController