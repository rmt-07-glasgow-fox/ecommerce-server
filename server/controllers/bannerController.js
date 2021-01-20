const { Banner } = require('../models')

class BannerController {
  static getBanners(req, res, next) {
    Banner.findAll({
      order: [['status', 'DESC']]
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
    let id = req.params.id
    let value = {
      status: req.body.status
    }
    Banner.update(value, {
      where: {id},
      returning: true
    })
    .then(data => {
      if(data){
        res.status(200).json(data[1][0])
      } else {
          next({status: 404})
      }
    })
    .catch(err => {
      if(err.name == "SequelizeValidationError"){
        next({
            status: 400,
            errors: err.errors
        })
      } else {
          next(err)
      }
    })
  }

  static deleteBanners(req, res, next) {
    let id = req.params.id
    Banner.destroy({where: {id}})
    .then(data => {
      if(data) {
        res.status(200).json({
          message: "Success delete banner"
        })
      } else {
        next({status: 404})
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = BannerController