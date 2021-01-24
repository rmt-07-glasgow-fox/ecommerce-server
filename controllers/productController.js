const { Product } = require('../models')

class ProductController {
    static addProduct(req, res, next) {
        let input = {
            name: req.body.name, 
            image_url: req.body.image_url,
            price: +req.body.price, 
            stock: +req.body.stock
        }

        Product.create(input)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static getProducts(req, res, next) {
        Product.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static getOneProduct(req, res, next) {
        let id = +req.params.id
        Product.findByPk(id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static updateProduct(req, res, next) {
        let id = +req.params.id
        let input = {
            name: req.body.name, 
            image_url: req.body.image_url, 
            price: +req.body.price, 
            stock: +req.body.stock
        }
        Product.update(input, {
            where: { id },
            returning: true 
        })
            .then(data => {
                res.status(200).json(data[1])
            })
            .catch(next)
    }

    static deleteProduct(req, res, next) {
        let id = +req.params.id
        Product.destroy({
            where: { id }
        })
            .then(response => {
                // console.log('ini response',response)
                if (response === 1) {
                    res.status(200).json({ message: 'Product has been deleted'})
                } else {
                    next({ name: 'Not Found'})
                }
            })
            .catch(next)
    }
}

module.exports = ProductController