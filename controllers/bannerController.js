const { Banner } = require('../models');

class BannerController {

  static postBanner = async (req, res, next) => {
    const { name, url } = req.body;
    try {
      const banner = await Banner.create({ name, url })
      res.status(201).json(banner)
    }
    catch(err) {
      next(err)
    }
  }

  static getBanners = async (req, res, next) => {
    try {
      const banners = await Banner.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json(banners)
    }
    catch(err) {
      next(err)
    }
  }

  static deleteBanner = async (req, res, next) => {
    try {
      const banner = await Banner.destroy({
        where: {
          id: req.params.id
        }
      });
      if (banner == 1) {
        res.status(200).json({ message: 'Success, banner deleted' })
      } else {
        throw { name: 'Not Found' }
      }
    }
    catch(err) {
      next(err);
    }
  }
}

module.exports = BannerController;