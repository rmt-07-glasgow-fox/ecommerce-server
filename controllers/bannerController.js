const { Banner } = require('../models')

class BannerController {
  static getBanner (req, res, next) {
    Banner.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static createBanner (req, res, next) {
    const newBanner = {
      title: req.body.title,
      image_url: req.body.image_url,
      status: req.body.status || false
    }
    Banner.create(newBanner)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getOneBanner (req, res, next) {
    const id = +req.params.id
    Banner.findByPk(id)
      .then(data => {
        if (data) {
          res.status(200).json(data)
        } else {
          next({ name: 'notFound' })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static updateBanner (req, res, next) {
    const id = +req.params.id
    const newUpdate = {
      title: req.body.title,
      image_url: req.body.image_url,
      status: req.body.status
    }
    Banner.update(newUpdate, {
      where: { id },
      returning: true
    })
      .then(data => {
        if (data[0] === 0) {
          next({ name: 'notFound' })
        } else {
          res.status(200).json(data[1][0])
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static modifyStatus (req, res, next) {
    const id = +req.params.id
    const newModify = {
      status: req.body.status
    }
    Banner.update(newModify, {
      where: { id },
      returning: true
    })
      .then(data => {
        if (data[0] === 0) {
          next({ name: 'notFound' })
        } else {
          res.status(200).json(data[1][0])
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteBAnner (req, res, next) {
    const id = +req.params.id
    Banner.destroy({
      where: { id }
    })
      .then(data => {
        if (data === 1) {
          res.status(200).json({
            message: 'Banner success to delete'
          })
        } else {
          next({ name: 'notFound' })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = BannerController