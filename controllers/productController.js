const { Product, User, Category } = require('../models/index.js');

class ProductController {
  static async createProduct (req, res, next) {
    try {
      const input = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        CategoryId: Number(req.body.CategoryId),
        UserId: req.user.id
      };

      const product = await Product.create(input);

      return res.status(201).json(product)
    } catch (err) {
      next(err);
    };
  };

  static async readProduct (req, res, next) {
    try {
      const product = await Product.findAll({
        include: [{
          model: User,
          attributes: { exclude: ['firstname', 'lastname', 'profpic', 'email', 'password', 'role', 'createdAt', 'updatedAt'] }
        }, {
          model: Category,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }],
        order: [['name', 'ASC']]
      });

      return res.status(200).json(product)
    } catch (err) {
      next(err);
    };
  };

  static async readOneProduct (req, res, next) {
    try {
      const inputId = Number(req.params.id);
      const product = await Product.findByPk(inputId, {
        include: [{
          model: User,
          attributes: { exclude: ['firstname', 'lastname', 'profpic', 'email', 'password', 'role', 'createdAt', 'updatedAt'] }
        }, {
          model: Category,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }]
      });

      if (!product) throw { name: 'productNotFound' };

      return res.status(200).json(product);
    } catch (err) {
      next(err);
    };
  };

  static async updateProduct (req, res, next) {
    try {
      const inputId = Number(req.params.id);
      const input = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        CategoryId: Number(req.body.CategoryId),
        UserId: req.user.id
      };

      const find = await Product.findByPk(inputId);

      if (!find) throw { name: 'productNotFound' };

      const update = await Product.update(input, { where: { id: inputId } });
      const product = await Product.findByPk(inputId, { update });

      if (!product) throw { name: 'productNotFound' };

      return res.status(200).json(product);
    } catch (err) {
      next(err);
    };
  };

  static async deleteProduct (req, res, next) {
    try {
      const inputId = Number(req.params.id);
      const find = await Product.findByPk(inputId);

      if (!find) throw { name: 'productNotFound' };

      await Product.destroy({ where: { id: inputId } });

      return res.status(200).json({ message: 'Product has been deleted.' });
    } catch (err) {
      next(err);
    };
  };
};

module.exports = ProductController;