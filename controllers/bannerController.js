const { Banner, Category } = require('../models')

class BannerController {
  static findAll(req, res, next) {
    Banner
      .findAll({
        include: ['Category']
      })
      .then(banners => {
        res.status(200).json(banners)
      })
      .catch(next)
  }

  static findByPk(req, res, next) {
    Banner
      .findByPk(+req.params.id, {
        include: ['Category']
      })
      .then(banner => {
        banner ? res.status(200).json(banner) :
        res.status(404).json({ message: 'Banner Not Found' })
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static create(req, res, next) {
    const { title, status, image_url, CategoryId } = req.body
    let bannerCreated = ''

    Banner.create({ title, status, image_url, CategoryId })
      .then(banner => {
        const { id, title, status, image_url, CategoryId } = banner
        bannerCreated = { id, title, status, image_url, CategoryId }
        return Category.findByPk(CategoryId)
      })
      .then(category => {
        bannerCreated.Category = category
        res.status(201).json(bannerCreated)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, status, image_url, CategoryId } = req.body
    let bannerUpdated = ''
    Banner
      .update({ title, status, image_url, CategoryId }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(banner => {
        if (!banner[1][0]) next({ name: 'CustomError', statusCode: 404, message: 'Banner Not Found' })
        else {
          const { id, title, status, image_url, CategoryId } = banner[1][0].dataValues
          bannerUpdated = { id, title, status, image_url, CategoryId }
          return Category.findByPk(CategoryId)
        }
      })
      .then(category => {
        bannerUpdated.Category = category
        res.status(200).json(bannerUpdated)
      })
      .catch(next)
  }

  static updateStatus(req, res, next) {
    const { status } = req.body
    Banner
      .update({ status }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(banner => {
        if (!banner[1][0]) next({ name: 'CustomError', statusCode: 404, message: 'Banner Not Found' })
        else {
          const { id, status } = banner[1][0].dataValues
          res.status(200).json({ id, status })
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Banner
      .destroy({ where: { id: +req.params.id }, returning: true })
      .then(banner => {
        banner ?
          res.status(200).json({ message: 'Banner success deleted!' }) :
          next({ name: 'CustomError', statusCode: 404, message: 'Banner Not Found' })
      })
      .catch(next)
  }
}

module.exports = BannerController