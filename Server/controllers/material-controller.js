const { Material } = require('../models')

class Controller {
    static showAllMaterial(req, res, next) {
        Material.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller Material: show all material'
                })
            })
    }

    static showById(req, res, next) {
        const id = +req.params.id

        Material.findByPk(id, {
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

    static showByCategory(req, res, next) {
        const category = req.params.category

        Material.findOne({
            where: { category },
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller Material: show by category'
                })
            })
    }

    static createMaterial(req, res, next) {
        const material = {
            name: req.body.name,
            image_url: req.body.image_url,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock
        }

        Material.create(material)
            .then(data => {
                const sent = {
                    id: data.id,
                    name: data.name,
                    image_url: data.image_url,
                    category: data.category,
                    price: data.price,
                    stock: data.stock
                }

                res.status(201).json(sent)
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller Material: create material'
                })
            })
    }

    static updateMaterial(req, res, next) {
        const id = +req.params.id

        Material.findByPk(id)
            .then(data => {
                if (!data) {
                    next({
                        message: 'Item not found',
                        code: 404,
                        from: 'Controller Material: update material'
                    })
                }

                const material = {
                    name: req.body.name,
                    image_url: req.body.image_url,
                    category: req.body.category,
                    price: req.body.price,
                    stock: req.body.stock
                }

                return Material.update(material, {
                    where: { id },
                    returning: true
                })
            })
            .then(data => {
                const sent = {
                    name: data[1][0].name,
                    image_url: data[1][0].image_url,
                    category: data[1][0].category,
                    price: data[1][0].price,
                    stock: data[1][0].stock
                }

                res.status(200).json(sent)
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller Material: update material'
                })
            })
    }

    static deleteMaterial(req, res, next) {
        const id = +req.params.id

        Material.findByPk(id)
            .then(data => {
                if (!data) {
                    next({
                        message: 'Item not found',
                        code: 404,
                        from: 'Controller Material: delete material'
                    })
                }

                return Material.destroy({
                    where: { id }
                })
            })
            .then(data => {
                res.status(200).json({ message: 'Item successfully deleted' })
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'Controller Material: delete material'
                })
            })
    }
}

module.exports = Controller