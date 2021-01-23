const {
  Product,
  Category
} = require('../models')

class ProductController {
  static getProducts(req, res, next) {
    Product.findAll({
        include: [Category],
        order: [
          ['updatedAt', 'ASC']
        ]
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static addProducts(req, res, next) {
    let value = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      CategoryId: req.body.CategoryId,
      UserId: req.userData.id
    }
    Product.create(value)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          next({
            status: 400,
            errors: err.errors
          })
        } else {
          next(err)
        }
      })
  }

  static getProductsId(req, res, next) {
    let id = req.params.id
    Product.findByPk(id, {
        include: [Category]
      })
      .then(data => {
        if (data) {
          res.status(200).json(data)
        } else {
          next({
            status: 404
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static editProducts(req, res, next) {
    let id = req.params.id
    let value = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: +req.body.price,
      stock: +req.body.stock,
      description: req.body.description,
      UserId: +req.userData.id,
      CategoryId: req.body.CategoryId
    }
    Product.update(value, {
        where: {
          id
        },
        returning: true
      })
      .then(data => {
        if (data) {
          res.status(200).json(data[1][0])
        } else {
          next({
            status: 404
          })
        }
      }).catch(err => {
        if (err.name == "SequelizeValidationError") {
          next({
            status: 400,
            errors: err.errors
          })
        } else {
          next(err)
        }
      })
  }

  static deleteProducts(req, res, next) {
    let id = req.params.id
    Product.destroy({
        where: {
          id
        }
      })
      .then(data => {
        if (data) {
          res.status(200).json({
            message: "Success delete product"
          })
        } else {
          next({
            status: 404
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController