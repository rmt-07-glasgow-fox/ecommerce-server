const { Product } = require("../models")

class productController {

    static get(req, res, next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)

    }

    static create(req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.create(newProduct)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.update(product, {
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if (!data) {
                next({
                    message: "data not found",
                    code: 404,
                })
            } else {
                res.status(200).json({ message: "data updated!" })
            }
        })
        .catch(next)

    }

    static delete(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: "data not found",
                        code: 400,
                    })
                } else {
                    res.status(200).json({ message: "Product success to delete" })
                }
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'data not found',
                        code: 404
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(next)
    }

}

module.exports = productController