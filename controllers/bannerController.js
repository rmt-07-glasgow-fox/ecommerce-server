const { Banner } = require('../models');

class BannerClass {
    static async getAll(req, res, next) {
        try {
            const banner = await Banner.findAll();

            return res.status(200).json(banner);
        } catch (error) {
            return next(error);
        }
    }

    static async store(req, res, next) {
        try {
            const { img_url, status } = req.body;
            const input = { img_url, status };

            const create = await Banner.create(input);

            return res.status(201).json(create);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const { img_url, status } = req.body;
            const input = { img_url, status };

            const banner = await Banner.findByPk(id);
            if (!banner) return next({ name: 'notFound' });

            await Banner.update(input, { where: { id } });
            await Banner.reload();

            return res.status(200).json(banner);

        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req, res, next) {
        try {
            const { id } = req.params;

            const banner = await Banner.findByPk(id);
            if (!banner) return next({ name: 'notFound' });

            await Banner.destroy();

            return res.status(200).json({
                message: 'successfully delete Banner'
            })

        } catch (error) {
            return next(error);
        }
    }
}

module.exports = BannerClass;