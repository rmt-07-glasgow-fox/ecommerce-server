const { Category, Product } = require('../models')

class CategoryController {
  static createCategories(req, res, next) {
    Category.create({
      name: req.body.name,
      UserId: req.userData.id
    }).then(data => {
      res.status(201).json(data)
    }).catch(err => {
      if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
        next({
          status: 400,
          errors: err.errors
        })
      } else {
        next(err)
      }
    })
  }

  static getCategories(req, res, next) {
    Category.findAll({
      include: ['Products']
    }).then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        next({status: 404})
      }
    }).catch(err => {
      next(err)
    })
  }

  static deleteCategories(req, res, next) {
    Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(data => {
      if(data) {
        res.status(200).json({
          message: "Success delete product"
        })
      } else {
        next({status: 404})
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CategoryController