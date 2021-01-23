const { Banner } = require('../models')

module.exports = class BannerController {
  static async fetchBanners (req, res, next) {
    try {
      let banners = await Banner.findAll({
        order: [['id','ASC']],
        attributes: {
          exclude: ['createdAt','updatedAt']
        }
      })

      res.status(200).json(banners)
    } catch (error) {
      next(error)
    }
  }

  static async fetchBanner (req, res, next) {
    try {
      let id = req.params.id;
      let banner = await Banner.findOne({ 
        where: { id },
        attributes: {
          exclude: ['createdAt','updatedAt']
        }
      })

      if (!banner) throw new Error ('BannerNotFound')
      res.status(200).json(banner)
    } catch (error) {
      next(error)
    }
  }

  static async createBanner (req, res, next) {
    try {
      let newBanner = {
        title: req.body.title,
        image_url: req.body.image_url
      }
      let banner = await Banner.create(newBanner)
      let { id, title, status, image_url } = banner
      res.status(201).json({ id, title, status, image_url })
    } catch (error) {
      next(error)
    }
  }

  static async updateBanner (req, res, next) {
    try {
      let bannerId = req.params.id;
      let updateBanner = {
        title: req.body.title,
        status: req.body.status,
        image_url: req.body.image_url
      }

      let [updated, [banner]] = await Banner.update(updateBanner, {
        where: { id: bannerId },
        returning: true
      })

      if (!updated) throw new Error('BannerNotFound')
      let { id, title, status, image_url } = banner
      res.status(200).json({ id, title, status, image_url })
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus (req, res, next) {
    try {
      let bannerId = req.params.id;
      let updateBanner = {
        status: req.body.status
      }

      let [updated, [banner]] = await Banner.update(updateBanner, {
        where: { id: bannerId },
        returning: true
      })

      if (!updated) throw new Error('BannerNotFound')
      let { id, title, status, image_url } = banner
      res.status(200).json({ id, title, status, image_url })
    } catch (error) {
      next(error)
    }
  }

  static async deleteBanner (req, res, next) {
    try {
      let id = req.params.id;
      let deleted = await Banner.destroy({ where: { id }})

      if (!deleted) throw new Error ('BannerNotFound')
      res.status(200).json({ message: 'Banner has been deleted' })
    } catch (error) {
      next (error)
    }
  }
}