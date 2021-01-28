const { Banner } = require('../models');
const { getPagination, getPagingData } = require('../helpers/pagination');
const { Op } = require('sequelize');

class BannerClass {
  static async getAll(req, res, next) {
    try {
      const { page, size, q } = req.query;
      let condition = q ? {
        title: {
          [Op.like]: `%${q}%`
        }
      } : null;

      const { limit, offset } = getPagination(page, size);

      const banner = await Banner.findAndCountAll({
        where: condition,
        limit,
        offset
      });

      const response = getPagingData(banner, page, limit);

      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;

      const banner = await Banner.findByPk(id);
      if (!banner) return next({ name: 'notFound' });

      return res.status(200).json(banner);

    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    try {
      const { title, image_url, status } = req.body;
      const input = { title, image_url, status };

      const create = await Banner.create(input);

      return res.status(201).json(create);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, image_url, status } = req.body;
      const input = { title, image_url, status };

      const banner = await Banner.findByPk(id);
      if (!banner) return next({ name: 'notFound' });

      await banner.update(input, { where: { id } });
      await banner.reload();

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

      await banner.destroy();

      return res.status(200).json({
        message: 'successfully delete Banner'
      })

    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BannerClass;