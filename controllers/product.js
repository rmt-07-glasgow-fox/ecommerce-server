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
}

module.exports = ProductController
