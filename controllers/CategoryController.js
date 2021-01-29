const { Category } = require('../models')

module.exports = class CategoryController {
  static async fetchCategories (req, res, next) {
    try {
      let categories =  await Category.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }

  static async createCategory (req, res, next) {
    try {
      let newCategory = { categoryName: req.body.categoryName };
      let category = await Category.create(newCategory);
      res.status(201).json({ id: category.id, categoryName: category.categoryName })
    } catch (error) {
      next (error)
    }
  }

  static async deleteCategory (req, res, next) {
    try {
      let id = req.params.id;
      let fetchCategory = await Category.findOne({where: {id}})
      if (!fetchCategory) throw new Error ('CategoryNotFound')
      await Category.destroy({where: {id}})
      res.status(200).json({
        deletedCategory: {id: fetchCategory.id, categoryName: fetchCategory.categoryName},
        message: 'Category has been deleted'
      })
    } catch (error) {
      next (error)
    }
  }
}