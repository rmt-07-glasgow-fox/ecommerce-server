const { Category, Product } = require('../models/index.js');

class CategoryController {
  static async createCategory (req, res, next) {
    try {
      const input = {
        name: req.body.name
      };

      const category = await Category.create(input);

      return res.status(201).json(category);
    } catch (err) {
      next(err);
    };
  };

  static async readCategory (req, res, next) {
    try {
      const category = await Category.findAll({
        include: [{
          model: Product,
          attributes: { exclude: ['UserId', 'createdAt', 'updatedAt'] }
        }], attributes: {
          exclude: ['createdAt', 'updatedAt']
        }, order: [['name', 'ASC']]
      });

      return res.status(200).json(category)
    } catch (err) {
      next(err);
    };
  };

  static async readOneCategory (req, res, next) {
    try {
      const inputId = Number(req.params.id);
      const category = await Category.findByPk(inputId, {
        include: [{
          model: Product,
          attributes: { exclude: ['UserId', 'createdAt', 'updatedAt'] }
        }], attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });

      if (!category) throw { name: 'categoryNotFound' };

      return res.status(200).json(category);
    } catch (err) {
      next(err);
    };
  };

  static async updateCategory (req, res, next) {
    try {
      const inputId = Number(req.params.id);
      const input = {
        name: req.body.name
      };

      const find = await Category.findByPk(inputId);

      if (!find) throw { name: 'categoryNotFound' };

      const update = await Category.update(input, { where: { id: inputId } });
      const category = await Category.findByPk(inputId, { update });

      if (!category) throw { name: 'categoryNotFound' };

      return res.status(200).json(category);
    } catch (err) {
      next(err);
    };
  };

  static async deleteCategory (req, res, next) {
    try {
      const inputId = Number(req.params.id);
      const find = await Category.findByPk(inputId);

      if (!find) throw { name: 'categoryNotFound' };

      await Category.destroy({ where: { id: inputId } });

      return res.status(200).json({ message: 'Category has been deleted.' });

    } catch (err) {
      next(err);
    };
  };
};

module.exports = CategoryController;