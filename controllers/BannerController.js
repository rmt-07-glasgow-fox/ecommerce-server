const { Banner } = require('../models')

class BannerController {
  static getBanners(req, res, next) {
    Banner.findAll({order: [['id', 'ASC']]})
      .then(banners =>{
        return res.status(200).json(banners)
      })
      .catch(err => {
        next(err)
      })
  }

  static createBanner(req, res, next) {
    const { title, status, image_url } = req.body
    const newBanner = { title, status, image_url }
    
    Banner.create(newBanner)
      .then(banner => {
        return res.status(201).json(banner)
      })
      .catch(err => {
        next(err)
      })
  }

  static getBannerById(req, res, next) {
    const id = +req.params.id

    Banner.findByPk(id)
      .then(banner => {
        if (!banner) {
          next({ name: 'resourceNotFound' })
        } else {
          return res.status(200).json(banner)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateBanner(req, res, next) {
    const id = +req.params.id
    const { title, status, image_url } = req.body
    const updatedBanner = { title, status, image_url }
    
    Banner.update(updatedBanner,{ 
      where: { id }, 
      returning: true, plain: true
    })
      .then(banner => {
        return res.status(200).json(banner[1])
      })
      .catch(err => {
        next(err)
      })
  }

  static destroyBanner(req, res, next) {
    const id = +req.params.id

    Banner.destroy({ where: { id } })
      .then(banner => {
        if (!banner) {
          next({ name: 'resourceNotFound' })
        } else {
          return res.status(200).json({ message: 'Banner succesfully deleted'})
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = BannerController

