const { Product } = require ("../models")

class ProductController {
    static listProduct (req, res, next) {
        Product.findAll()
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }
    static addProduct (req, res, next) {
        const { name, imageUrl, price, stock, status } = req.body
        const UserId = +req.user.id
        const image_url = imageUrl

        Product.create ({ name, image_url, price, stock, status, UserId })
            .then(result => {
                const { id, name, image_url, price, stock, status, UserId } = result
                const output = { id, name, image_url, price, stock, status, UserId }
                return res.status(201).json(output)
            })
            .catch(err => {
                next (err)
            })
    }
    static getOne (req, res, next) {
        const id = +req.params.id

        Product.findByPk(id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next (err)
            })
    }
    static editProduct (req, res, next) {
        const { name, imageUrl, price, stock } = req.body
        const id = +req.params.id
        const image_url = imageUrl

        Product.update({ name, image_url, price, stock }, {
            where: {
                id
            }, fields: [ "name", "image_url", "price", "stock" ]
        })
            .then(result => {
                if (result[0] === 1) {
                    res.status(201).json()
                } else {
                    next({ name: "ResourceNotFound" })
                }
            })
            .catch(err => {
                next(err)
            })      
    }
    static moveProduct (req, res, next) {
        const { status } = req.body
        const id = +req.params.id

        Product.update({ status }, {
            where: {
                id
            }, fields: [ "status" ]
        })
            .then(result => {
                if(result[0] === 1) {
                    res.status(201).json()
                } else {
                    next({ name: "ResourceNotFound" })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static removeProduct (req, res, next) {
        const id = +req.params.id

        Product.destroy({ where: { id } })
            .then(result => {
                if (result === 1) {
                    res.status(200).json({ message: "Task Succesfully Deleted" })
                } else {
                    next({ name: "ResourceNotFound" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ProductController