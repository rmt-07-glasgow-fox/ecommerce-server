const { Banner } = require('../models')

class BannerController {

  static async create(req, res, next) {
    try {
      let { title, category, status } = req.body

      let banner = await Banner.create({
        title,
        category,
        status
      })

      res.status(201).json(banner)
    } catch(error) {
      next(error)
    }
  }

  static async findAll(req, res, next) {
    try {
      let banners = await Banner.findAll()
      res.status(200).json(banners)
    } catch(error) {
      next(errors)
    }
  }

  static async findOne(req, res, next) {
    try {
      let id = req.params.id
      let banner = await Banner.findByPk(id)

      if (banner) {
        res.status(200).json(banner)
      } else {
        next({name: 'notFound'})
      }
    } catch(error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      let { title, category, status } = req.body
      let id = req.params.id
      let banner = await Banner.findByPk(id)
      banner.title = title
      banner.category = category
      banner.status = status
      await banner.save()

      res.status(200).json(banner)
    } catch(error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      let id = req.params.id

      let banner = await Banner.findByPk(id)

      if (banner) {
        await banner.destroy()
        res.status(200).json({msg: 'Banner has been deleted'})
      } else {
        next({name: 'notFound'})
      }
    } catch(error) {
      next(error)
    }
  }


}

module.exports = { BannerController }