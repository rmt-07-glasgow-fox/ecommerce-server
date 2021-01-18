const { Product } = require('../models')

class ProductController {
    static showAllList (req, res, next) {
        Product.findAll()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(next)
    }

    static create (req, res, next) {
        let payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(payload)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }
}

module.exports = ProductController