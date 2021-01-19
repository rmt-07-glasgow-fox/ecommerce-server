const { Product, Category } = require('../models');

class ProductController {

    static getProducts = async (req, res, next) => {
        try {
            const products = await Product.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Category,
                    attributes: ['name']
                },
                order: [['id', 'ASC']]
            });
            res.status(200).json(products);
        }
        catch(err) {
            next(err);
        }
    }

    static postProduct = async (req, res, next) => {
        const { name, url, price, stock, CategoryId } = req.body;
        try {
            const product = await Product.create({
                name, url, price, stock, CategoryId
            });
            res.status(201).json(product);
        }
        catch(err) {
            next(err);
        }
    }

    static getProduct = async (req, res, next) => {
        try {
            const product = await Product.findByPk(req.params.id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Category,
                    attributes: ['name']
                }
            });
            if (product) {
                res.status(200).json(product);
            } else {
                throw { name: 'NotFound' };
            }
        }
        catch(err) {
            next(err);
        }
    }

    static putProduct = async (req, res, next) => {
        const { name, url, price, stock, CategoryId } = req.body;
        try {
            const product = await Product.update({
                name, url, price, stock, CategoryId
            }, {
                where: { id: req.params.id }, returning: true, individualHooks: true
            });
            if (product[0] == 1) {
                res.status(200).json(product[1][0]);
            } else {
                throw { name: 'NotFound' };
            }
        }
        catch(err) {
            next(err);
        }
    }
 
    static deleteProduct = async (req, res, next) => {
        try {
            const product = await Product.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (product == 1) {
                res.status(200).json({ message: 'Success, product deleted' });
            } else {
                throw { name: 'NotFound' };
            }
        }
        catch(err) {
            next(err);
        }
    }

}

module.exports = ProductController;