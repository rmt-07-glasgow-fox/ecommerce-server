const { Banner } = require('../models')

class BannerController {
  static findAll(req, res, next) {
    Banner
      .findAll({
        include: ['Category']
      })
      .then(banners => {
        res.status(200).json(banners)
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static findByPk(req, res, next) {
    Banner
      .findByPk(+req.params.id)
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
    Banner.create({ title, status, image_url, CategoryId })
      .then(banner => {
        const { id, title, status, image_url, CategoryId } = banner
        res.status(201).json({ id, title, status, image_url, CategoryId })
      })
      .catch(err => {
        const message = err.errors ? err.errors.map(e => e.message) : 'Internal Server Error'

        err.errors ? res.status(400).json({ message }) :
        res.status(500).json({ message })
      })
  }

  static update(req, res, next) {
    const { title, status, image_url, CategoryId } = req.body
    Banner
      .update({ title, status, image_url, CategoryId }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(banner => {
        if (!banner[1][0]) res.status(404).json({ message: 'Banner Not Found' })
        else {
          const { id, title, status, image_url, CategoryId } = banner[1][0].dataValues
          res.status(200).json({ id, title, status, image_url, CategoryId })
        }
      })
      .catch(err => {
        const message = err.errors ? err.errors.map(e => e.message) : 'Internal Server Error'

        err.errors ? res.status(400).json({ message }) :
        res.status(500).json({ message })
      })
  }

  static updateStatus(req, res, next) {
    const { status } = req.body
    Banner
      .update({ status }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(banner => {
        if (!banner[1][0]) res.status(404).json({ message: 'Banner Not Found' })
        else {
          const { id, status } = banner[1][0].dataValues
          res.status(200).json({ id, status })
        }
      })
      .catch(err => {
        const message = err.errors ? err.errors.map(e => e.message) : 'Internal Server Error'

        err.errors ? res.status(400).json({ message }) :
        res.status(500).json({ message })
      })
  }

  static delete(req, res, next) {
    Banner
      .destroy({ where: { id: +req.params.id }, returning: true })
      .then(banner => {
        banner ?
          res.status(200).json({ message: 'Banner success deleted!' }) :
          res.status(404).json({ message: 'Banner Not Found' })
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }
}

module.exports = BannerController