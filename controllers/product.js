const { Product } = require('../models');

class ProductController {
  static async create(req, res, next) {
    try {
      const { name, imageUrl, price, stock } = req.body;
      const newProduct = { name, imageUrl, price, stock };
      const createdProduct = await Product.create(newProduct);
      return res.status(201).json(createdProduct);
    }
    catch (err) {
      console.log(err);
      return next(err);
    }
  }
}

module.exports = ProductController;