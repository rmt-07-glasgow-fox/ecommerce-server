const { Banner } = require('../models/index.js');

class BannerController {
  static async createBanner(req, res, next) {
    try {
      const input = {
        name: req.body.name,
        image_url: req.body.image_url
      };

      const banner = await Banner.create(input);

      return res.status(201).json(banner);
    } catch (err) {
      next(err);
    };
  };

  static async readBanner(req, res, next) {
    try {
      const banner = await Banner.findAll();

      return res.status(200).json(banner)
    } catch (err) {
      next(err);
    };
  };

  static async readOneBanner(req, res, next) {
    try {
      const inputId = Number(req.params.id);
      const banner = await Banner.findByPk(inputId);

      if (!banner) throw { name: 'bannerNotFound' };

      return res.status(200).json(banner);
    } catch (err) {
      next(err);
    };
  };

  static async updateBanner(req, res, next) {
    try {
      const inputId = Number(req.params.id);
      const input = {
        name: req.body.name,
        image_url: req.body.image_url
      };

      const find = await Banner.findByPk(inputId);

      if (!find) throw { name: 'bannerNotFound' };

      const update = await Banner.update(input, { where: { id: inputId } }, { find });
      const banner = await Banner.findByPk(inputId, { update });

      if (!banner) throw { name: 'bannerNotFound' };

      return res.status(200).json(banner);
    } catch (err) {
      next(err);
    };
  };

  static async deleteBanner(req, res, next) {
    try {
      const inputId = Number(req.params.id);
      const find = await Banner.findByPk(inputId);

      if (!find) throw { name: 'bannerNotFound' };

      await Banner.destroy({ where: { id: inputId } });

      return res.status(200).json({ message: 'banner has been deleted.' });

    } catch (err) {
      next(err);
    };
  };
};

module.exports = BannerController;