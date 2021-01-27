const {Banner} = require('../models/index')

class Controller {
  static create (req, res, next) {
    let obj = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    }
    Banner.create(obj)
    .then(data => {
      return res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static showBanner (req, res, next) {
    Banner.findAll()
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static showById (req, res, next) {
    let id = req.params.id
    Banner.findByPk(id)
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static update (req, res, next) {
    let id = req.params.id
    let obj = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    }
    Banner.update(obj,{where: {id}, returning: true, plain: true})
    .then( data => {
      return res.status(200).json(data[1])
    })
    .catch(err => {
      next(err)
    })
  }

  static destroy (req, res, next) {
    let id = req.params.id
    Banner.destroy({where: {id}})
    .then(data => {
      return res.status(200).json({msg: `banner has been deleted`})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller