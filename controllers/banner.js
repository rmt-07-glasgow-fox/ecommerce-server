const { Banner } = require('../models')

class BannerController {
    static async getAllBanner (req, res, next) {
        try {
            const banners = await Banner.findAll()
            res.status(200).json(banners)
        }
        catch (err){
            next(err)
        }
    }
    static async getBannerById (req, res, next) {
        try {
            const banner = await Banner.findOne({where: {id: req.params.id}})
            if(!banner){
                throw {
                    name: 'bannerNotFound',
                    status: 404
                }
            } else {
                res.status(200).json(banner)
            }
        }
        catch(err){
            next(err)
        }
    }
    static async createBanner (req, res, next) {
        const payload = {
            title: req.body.title,
            image_url: req.body.image_url,
            status: req.body.status
        }
        try {
            const newBanner = await Banner.create(payload)
            res.status(201).json(newBanner)
        }
        catch(err){
            console.log(err)
            next(err)
        }
    } 
    static async editBanner (req, res, next) {
        const payload = {
            title: req.body.title,
            image_url: req.body.image_url,
            status: req.body.status
        }
        try {
            const banner = await Banner.update(payload, {where: {id: req.params.id}, returning: true})
            res.status(200).json(banner[1][0])
        }
        catch (err) {
            next(err)
        }
    }
    static async deleteBanner (req, res, next) {
        const id = req.params.id
        try {
            const banner = await Banner.destroy({where: {id}})
            res.status(200).json('delete banner has been success')
        }
        catch (err){
            next(err)
        }
    }

}

module.exports = BannerController