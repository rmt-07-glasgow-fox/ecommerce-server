const { Product, Category } = require('../models');
const { getPagination, getPagingData } = require('../helpers/pagination')
const { Op } = require('sequelize')

class ProductController {
  static async getAll(req, res, next) {
    try {
      const { page, size, q } = req.query;
      let condition = q ? {
        name: {
          [Op.like]: `%${q}%`
        }
      } : null;

      const { limit, offset } = getPagination(page, size);

      const product = await Product.findAndCountAll({
        where: condition,
        limit,
        offset,
        include: ['category']
      });

      const response = getPagingData(product, page, limit);

      return res.status(200).json(response)
    } catch (error) {
      return next(error)
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);
      if (!product) return next({ name: 'notFound' });

      return res.status(200).json(product);

    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    try {
      const { name, image_url, price, stock, categoryId } = req.body;
      const input = { name, image_url, price, stock, categoryId, userId: req.user.id };

      const category = await Category.findByPk(categoryId);

      if (!category) return next({ name: 'notFound' });

      const product = await Product.create(input);

      return res.status(201).json(product);

    } catch (error) {
      return next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, image_url, price, stock, categoryId } = req.body;
      const input = { name, image_url, price, stock, categoryId };

      const product = await Product.findByPk(id);
      const category = await Category.findByPk(categoryId);

      if (!product) return next({ name: 'notFound' });
      if (!category) return next({ name: 'notFound' });

      await product.update(input, { where: { id } });
      await product.reload();


      return res.status(200).json(product)

    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id);

      if (!product) return next({ name: 'notFound' });
      await product.destroy();

      return res.status(200).json({
        message: 'successfully delete product'
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;