const { Banner } = require('../models')

class Controller {
    static showBanner(req, res, next) {
        Banner.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller Banner: show all banner'
                })
            })
    }

    static showById(req, res, next) {
        const id = +req.params.id

        Banner.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller Material: show by id'
                })
            })
    }

    static createBanner(req, res, next) {
        const banner = {
            title: req.body.title,
            image_url: req.body.image_url,
            status: req.body.status
        }

        Banner.create(banner)
            .then(data => {
                const sent = {
                    title: data.title,
                    image_url: data.image_url,
                    status: data.status
                }

                res.status(201).json(sent)
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller banner: create banner'
                })
            })
    }

    static updateBanner(req, res, next) {
        const id = +req.params.id

        Banner.findByPk(id)
            .then(data => {
                if (!data) {
                    next({
                        message: 'Item not found!',
                        code: 404,
                        from: 'Controller Banner: update banner'
                    })
                }

                const banner = {
                    title: req.body.title,
                    image_url: req.body.image_url,
                    status: req.body.status
                }

                return Banner.update(banner, {
                    where: { id },
                    returning: true
                })
            })
            .then(data => {
                const sent = {
                    title: data[1][0].title,
                    image_url: data[1][0].image_url,
                    status: data[1][0].status
                }

                res.status(201).json(sent)
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller Banner: update banner'
                })
            })
    }

    static deleteBanner(req, res, next) {
        const id = +req.params.id

        Banner.findByPk(id)
            .then(data => {
                if(!data) {
                    next({
                        message: 'Item not found!',
                        code: 404,
                        from: 'Controller Banner: delete banner'
                    })
                }

                return Banner.destroy({
                    where: {id}
                })
            })
            .then(data => {
                res.status(200).json({message: 'Banner succesfully deleted!'})
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller Banner: delete banner'
                })
            })
    }
}

module.exports = Controller