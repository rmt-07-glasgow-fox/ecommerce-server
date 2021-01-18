const { Product } = require("../models")

class productController {

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

        Product.update(product)

    }

}

module.exports = productController