const { Category } = require('../models/index');

class CategoryController {
  static async postCategory (req, res, next) {
    try {
      let data = {
        name: req.body.name
      }

      data = await Category.create(data);

      data = {
        id: data.id,
        name: data.name
      }

      return res.status(201).json(data);
    } catch (err) {
      if (err.errors) {
        return next({ code: 400, msg: err.errors });
      }
      
      return next({ code: 500 });
    }
  }

  static async getCategory (req, res, next) {
    try {
      let data = await Category.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });

      return res.status(200).json(data);
    } catch (err) {
      return next({ code: 500 });
    }
  }

  static async deleteCategory (req, res, next) {
    try {
      await Category.destroy({ where: { id: req.params.categoryId } });

      return res.status(200).json({ msg: "Success delete category" });
    } catch (err) {
      return next({ code: 500 });
    }
  }
}

module.exports = CategoryController;