const { Banner } = require('../models')

class BannerController {
  static getBanners(req, res, next) {
    Banner.findAll({
      order: [['status', 'ASC']]
    }).then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        next({status: 404})
      }
    }).catch(err => {
      next(err)
    })
  }

  static addBanners(req, res, next) {
    let value = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url,
      UserId: req.userData.id
    }
    Banner.create(value)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if(err.name === 'SequelizeValidationError'){
        next({
          status: 400,
          errors: err.errors
        })
      } else {
        next(err)
      }
    })
  }

  static getBannerId(req, res, next) {

  }

  static editStatusBanners(req, res, next) {

  }

  static deleteBanners(req, res, next) {

  }
}

module.exports = BannerController