const { Product, Category } = require('../models')

class CategoryController {
  static async getCategory (req, res, next) {
    try {
      const categories = await Category.findAll({
        order: [['name', 'asc']]
      })

      res.status(200).json({ categories })
    } catch (error) {
      next(error)
    }
  }

  static async getCategoryById (req, res, next) {
    const id = req.params.id

    try {
      const category = await Category.findOne({
        include: {
          model: Product
        },
        where: {
          id
        },
        order: [[Product, 'id', 'asc']]
      })

      res.status(200).json({ category })
    } catch (error) {
      next(error)
    }
  }

  static async addCategory (req, res, next) {
    const payload = {
      name: req.body.name,
      image: req.body.image
    }

    try {
      const category = await Category.create(payload)

      res.status(200).json({ category })
    } catch (error) {
      next(error)
    }
  }

  static async putCategory (req, res, next) {
    const id = req.params.id
    const payload = {
      name: req.body.name,
      image: req.body.image
    }

    try {
      const category = await Category.update(payload, {
        where: {
          id
        },
        returning: true
      })

      res.status(200).json({category: category[1][0]})
    } catch (error) {
      next(error)
    }
  }

  static async deleteCategory (req, res, next) {
    const id = req.params.id

    try {
      const category = await Category.destroy({
        where: {
          id
        }
      })

      res.status(200).json({message: `Category is Deleted`})
    } catch (error) {
      next(error)
    }
  }

}

module.exports = CategoryController