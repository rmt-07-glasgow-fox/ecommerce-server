const { Category } = require('../models');
const { getPagination, getPagingData } = require('../helpers/pagination');
const { Op } = require('sequelize');

class CategoryClass {
  static async getAll(req, res, next) {
    try {
      const { page, size, q } = req.query;
      let condition = q ? {
        name: {
          [Op.like]: `%${q}%`
        }
      } : null;

      const { limit, offset } = getPagination(page, size);

      const category = await Category.findAndCountAll({
        where: condition,
        limit,
        offset
      });

      const response = getPagingData(category, page, limit);

      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);
      if (!category) return next({ name: 'notFound' });

      return res.status(200).json(category);

    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    try {
      const { name } = req.body;
      const input = { name };

      const create = await Category.create(input);

      return res.status(201).json(create);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const input = { name };

      const category = await Category.findByPk(id);
      if (!category) return next({ name: 'notFound' });

      await category.update(input, { where: { id } });
      await category.reload();

      return res.status(200).json(category);

    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);
      if (!category) return next({ name: 'notFound' });

      await category.destroy();

      return res.status(200).json({
        message: 'successfully delete category'
      })

    } catch (error) {
      return next(error);
    }
  }
}

module.exports = CategoryClass;