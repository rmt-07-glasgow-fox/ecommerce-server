const { Banner } = require('../models')

class BannerController {
  static getAllBanners(req, res, next){
    Banner.findAll({
      order:[
        ['id', 'ASC']
      ]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getBannerById(req, res, next){
    Banner.findByPk(req.params.id)
      .then(data => {
        if(data){
          res.status(200).json(data)
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static addBanner(req, res, next){
    Banner.create({
      title: req.body.title || '',
      status: req.body.status || '',
      image_url: req.body.image_url || '',
      UserId: req.userData.id
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static editBannerById(req, res, next){
    Banner.update(req.body, {
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data[0] === 1){
          res.status(200).json({
            message: 'Success your banner has been saved.'
          })
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteBannerById(req, res, next){
    Banner.destroy({
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data === 1){
          res.status(200).json({
            message: 'Success your banner has been deleted.'
          })
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = BannerController