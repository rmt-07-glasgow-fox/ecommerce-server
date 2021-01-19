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
            console.log(err.name)
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
        
    }

    static updateProduct(req, res, next) {
        
    }

    static destroyProduct(req, res, next) {
        
    }
}

module.exports = { ProductController }