const { Product, Category } = require('../models');

class ProductController {
    static async getAll(req, res, next) {
        try {
            const product = await Product.findAll();

            return res.status(200).json(product)
        } catch (error) {
            return next(error)
        }
    }

    static async store(req, res, next) {
        try {
            const { name, image_url, price, stock } = req.body;
            const input = { name, image_url, price, stock };


            const product = await Product.create(input);

            return res.status(201).json(product);

        } catch (error) {
            return next(error)
        }
    }
}

module.exports = ProductController;