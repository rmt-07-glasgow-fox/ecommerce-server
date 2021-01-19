const { Product } = require('../models/')

class ProductController {
    static create(req, res, next) {
        const { name, image_url, price, stock } = req.body
        Product.create({
            name,
            image_url,
            price,
            stock
        })
            .then((product) => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { stock, price, name, image_url } = req.body
        const id = +req.params.id

        Product.findByPk(id)
            .then(product => {
                return product.update({
                    stock,
                    price,
                    name,
                    image_url
                })
            })
            .then(updatedProduct => {
                res.status(200).json(updatedProduct)
            })
            .catch(next)
    }
}

module.exports = ProductController
