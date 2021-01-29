const { Category, Banner } = require('../models')

module.exports = class Controller {
    static welcome(req, res, next) {
        return res.status(200).json({ message: "Welcome~" })
    }

    static showCategories(req, res, next) {
        Category.findAll({
            order: [['id', 'DESC']]
        })
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch(err => next(err))
    }

    static showBanners(req, res, next) {
        Banner.findAll()
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch(err => next(err))
    }
}