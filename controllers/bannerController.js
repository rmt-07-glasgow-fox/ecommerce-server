const { Banner } = require('../models')

class BannerController {
    static async addBanner(req, res, next) {
        try {
            let { title, image_url } = req.body
            console.log(req.body)

            let newBanner = await Banner.create(req.body)

            let response = {
                id: newBanner.id,
                title: newBanner.title,
                image_url: newBanner.image_url,
                status: newBanner.status
            }

            return res.status(201).json(response)
        } catch (err) {
            return next(err)
        }
    }

    static async showBanner(req, res, next) {
        try {
            let banner = await Banner.findAll({ order: [['id']] })
            return res.status(200).json(banner)
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = BannerController