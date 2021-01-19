const { Product } = require('../models')

class ProductController {
    static createProduct(req, res, next) {
        const { name, image_url, price, stock} = req.body
        const obj = {
            name,
            image_url,
            price,
            stock
        }

        Product.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            // console.log(err.name)
            next(err)
        })
    }

    static findProduct(req, res, next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findProductById(req, res, next) {
        const id = +req.params.id
        Product.findByPk(id)
        .then(data => {
            if (!data) {
                next({ name: 'Data Not Found'})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static updateProduct(req, res, next) {
        const id = +req.params.id
        const { name, image_url, price, stock} = req.body
        const obj = {
            name,
            image_url,
            price,
            stock
        }

        Product.update(obj, {
            where: {
                id
            }
        })
        .then(data => {
            return Product.findByPk(id)
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err.name)
            next(err)
        })
    }

    static destroyProduct(req, res, next) {
        const id = +req.params.id
        Product.destroy({
            where: {
                id
            }
        })
        .then(data => {
            if (!data) {
                next({ name: 'Data Not Found'})
            } else {
                res.status(200).json({message: 'Todo Has Been Succesfully Deleted'})
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = { ProductController }