const { Banner, User } = require('../models')

class BannerController {
  static async showAll(req,res,next){
    try {
      const banner = await Banner.findAll({
        order:[['id']],
        include: [User]
      })
      res.status(200).json(banner)
    } catch (err) {
      next(err)
    }
  }

  static async showOne(req,res,next){
    try {
      const {id} = req.params
      const banner = await Banner.findOne({
        where: {id}
      })
      if(banner) res.status(200).json(banner)
      else next({name: 'ErrorNotFound'})
    } catch (err) {
      next(err)
    }
  }

  static async create(req,res,next){
    try {
      const UserId = req.user.id
      const { title, status, image_url } = req.body
      const input = {
        title: title || '',
        status: status || '',
        image_url: image_url || '',
        UserId
      }
      const banner = await Banner.create(input)
      res.status(201).json(banner)
    } catch (err) {
      next(err)
    }
  }

  static async edit(req,res,next){
    try {
      const { id } = req.params
      const UserId = req.user.id
      const { title, status, image_url } = req.body
      const input = {
        title: title || '',
        status: status || '',
        image_url: image_url || '',
        UserId
      }
      const banner = await Banner.update(input, {
        where: {id},
        returning: true
      })
      if(banner) res.status(200).json(banner[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async delete(req,res,next){
    try {
      const {id} = req.params
      const banner = await Banner.destroy({
        where: {id}
      })
      if(banner) res.status(200).json({message: 'banner deleted successfully'})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = BannerController