const { Category, User } = require('../models')

class CategoryController {
  static getAllCategories(req, res, next){
    Category.findAll({
      order: [
        ['id', 'ASC']
      ],
      include: [ User ]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getCategoryById(req, res, next){
    Category.findByPk(req.params.id, {
      include: [ User ]
    })
      .then(data => {
        if(!data){
          next({
            name: 'NoData'
          })
        }else{
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static addCategory(req, res, next){
    Category.create({
      name: req.body.name,
      UserId: req.userData.id
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static editCategoryById(req, res, next){
    Category.update(req.body, {
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data[0] === 1){
          res.status(200).json({
            message: 'Success your category has been saved.'
          })
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteCategoryById(req, res, next){
    Category.destroy({
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data === 1){
          res.status(200).json({
            message: 'Success your category has been deleted.'
          })
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CategoryController