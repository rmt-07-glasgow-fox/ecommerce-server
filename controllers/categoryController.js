const { Category, Product } = require('../models');

class CategoryController {
    
    static getCategories = async (req, res, next) => {
        try {
            const categories = await Category.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: ['name', 'ASC']
            });
            res.status(200).json(categories);
        }
        catch(err) {
            next(err);
        }
    }

    static postCategory = async (req, res, next) => {
        const { name } = req.body;
        try {
            const category = await Category.create({ name });
            res.status(201).json(category);
        }
        catch(err) {
            next(err);
        }
    }

    static getCategory = async (req, res, next) => {
        try {
            const category = await Category.findByPk(req.params.id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Product
                }
            });
            res.status(200).json(category);
        }
        catch(err) {
            next(err);
        }
    }

    static deleteCategory = async (req, res, next) => {
        try {
            const category = await Category.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (category == 1) {
                res.status(200).json({ message: 'Success, category deleted' });
            } else {
                throw { name: 'NotFound' };
            }
        }
        catch(err) {
            next(err);
        }
    }
}

module.exports = CategoryController;