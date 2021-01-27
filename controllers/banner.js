const { Banner } = require('../models')

class BannerController {
  static async getBanner (req, res, next) {
    try {
      const banners = await Banner.findAll({
        order: [['id', 'asc']]
      })

      res.status(200).json({ banners })
    } catch (error) {
      next(error)
    }
  }

  static async getBannerById (req, res, next) {
    const id = req.params.id

    try {
      const banner = await Banner.findOne({
        where: {
          id
        }
      })

      res.status(200).json({ banner })
    } catch (error) {
      next(error)
    }
  }

  static async addBanner (req, res, next) {
    const payload = {
      title: req.body.title,
      image_url: req.body.image_url,
      status: req.body.status || ''
    }

    try {
      const banner = await Banner.create(payload)

      res.status(200).json({ banner })
    } catch (error) {
      next(error)
    }
  }

  static async editBanner (req, res, next) {
    const id = req.params.id
    const payload = {
      title: req.body.title,
      image_url: req.body.image_url,
      status: req.body.status
    }

    try {
      const banner = await Banner.update(payload, {
        where: {
          id
        },
        individualHooks: true,
        returning: true
      })

      res.status(200).json({banner: banner[1][0]})
    } catch (error) {
      next(error)
    }
  }

  static async deleteBanner (req, res, next) {
    const id = req.params.id

    try {
      const banner = await Banner.destroy({
        where: {
          id
        }
      })

      res.status(200).json({ message: `Banner is Deleted` })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BannerController