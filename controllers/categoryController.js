const { Category } = require('../models');

class CategoryClass {
    static async getAll(req, res, next) {
        try {
            const category = await Category.findAll();

            return res.status(200).json(category);
        } catch (error) {
            return next(error);
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