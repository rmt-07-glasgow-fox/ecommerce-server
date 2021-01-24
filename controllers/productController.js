const { Product } = require('../models')

class ProductController {

    static postProductHandler(req, res, next) {

        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        
        Product.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static getProductHandler(req, res, next) {

        Product.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static getProductByIdHandler(req, res, next) {
        let id = req.params.id

        Product.findByPk(id)
            .then(data => {
                if(!data) {
                    next({name: 'notFound'})
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(next)
    }

    static putProductHandler(req, res, next) {
        let id = req.params.id
        let { name, image_url, price, stock } = req.body

        Product.update(req.body, {
            where: {
                id
            }, returning: true
        })
        .then(data => {
            
            if(data[1].length === 0) {
                next({name: "notFound"})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(next)
    }

    static deleteProductHandler(req, res, next) {

        let id = req.params.id

        Product.destroy({
            where: {
                id
            }
        })
            .then(data => {
                if(data === 0) {
                    next({name: "notFound"})
                } else {
                    res.status(200).json({message: 'Delete Product success'})
                }
            })
            .catch(next)
    }
}

module.exports = ProductController