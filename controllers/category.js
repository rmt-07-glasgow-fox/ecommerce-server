const { Category } = require('../models')

class CategoryController {
  static async showAll(req,res,next){
    try {
      const categories = await Category.findAll({
        order: [['id']]
      })
      res.status(200).json(categories)
    } catch (err) {
      next(err)
    }
  }

  static async showOne(req,res,next){
    try {
      const {id} = req.params
      const category = await Category.findOne({
        where: {id}
      })
      if(category) res.status(200).json(category)
      else next({name: 'ErrorNotFound'})
    } catch (err) {
      next(err)
    }
  }

  static async create(req,res,next){
    try {
      const UserId = req.user.id
      const { name } = req.body
      const input = {
        name: name || '',
        UserId
      }
      const category = await Category.create(input)
      res.status(201).json(category)
    } catch (err) {
      next(err)
    }
  }

  static async edit(req,res,next){
    try {
      const {id} = req.params
      const UserId = req.user.id
      const { name } = req.body
      const input = {
        name: name || '',
        UserId
      }
      const category = await Category.update(input,{
        where: {id},
        returning: true
      })
      res.status(200).json(category[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async delete(req,res,next){
    try {
      const {id} = req.params
      const category = await Category.destroy({
        where: {id}
      })
      res.status(200).json({message: 'category deleted successfully'})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CategoryController