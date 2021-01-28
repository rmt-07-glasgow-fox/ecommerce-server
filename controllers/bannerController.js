const {Banner} = require("../models")

class bannerController {
    static create(req, res, next) {
        const {title, status, imageUrl} = req.body
        Banner.create({title, status, imageUrl})
          .then(banner => {
            const {id, title, status, imageUrl} = banner
            res.status(201).json({id, title, status, imageUrl})
          })
          .catch(err => {
            next(err)
          })
    }

    static getBanners(req, res, next) {
      Banner.findAll()
      .then(banners => {
        const output = banners.map(el => {
          return { 
            id: el.id, 
            title: el.title,
            status: el.status,
            imageUrl: el.imageUrl
            }
        })
        res.status(200).json(output)
      })
      .catch(err => {
        next(err)})
    }

    static getBanner(req, res, next) {
      Banner.findByPk(+req.params.id)
      .then(banner => {
        const {id, title, status, imageUrl} = banner
        res.status(200).json({id, title, status, imageUrl})
      })
      .catch(err => {
        next(err)})
    }

    static editBanner(req, res, next) {
      const {title, status, imageUrl} = req.body
        Banner.update({title, status, imageUrl}, {where: {id: +req.params.id}})
          .then(banner => {
            res.status(200).json({message: "edit banner successfull"})
          })
          .catch(err => {
            next(err)
          })
    }

    static deleteBanner(req, res, next) {
      Banner.destroy({where: {id: +req.params.id}})
      .then(data => {
        res.status(200).json({message: 'delete banner successfull'})
      })
      .catch(err => next(err))
    }
}

module.exports = bannerController