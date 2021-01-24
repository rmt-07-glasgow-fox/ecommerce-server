const { product } = require('../models') 

class ProductController {
    static getall (req, res, next) {
        product.findAll()
        .then( dataProduct => {
            res.status(200).json({products: dataProduct})
        })
        .catch( err => {
            res.status(500).json({message: 'Internal server error'})
        })
    }

    static create (req, res, next) {
        let newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }

        product.create(newProduct)
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err => { 
            if( err.name === 'SequelizeValidationError'){
                let errors = err.errors.map(err => err.message)
                res.status(401).json(errors)
            } else {
                res.status(500).json({message: 'Internal server error'})
            }
        })
    }

    static update (req, res, next) {
        let id = +req.params.id
        let updateProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
        product.update(updateProduct, {
            where: {
                id
            }
        })
        .then( data => {
            res.status(200).json({message: 'Product is updated'})
        })
        .catch( err => {
            if( err.name === 'SequelizeValidationError'){
                let errors = err.errors.map(err => err.message)
                res.status(401).json(errors)
            } else {
                res.status(500).json({message: 'Internal server error'})
            }
        })
    }

    static delete (req, res, next) {
        let id = +req.params.id
        product.destroy({
            where: {
                id
            }
        })
        .then( data => {
            res.status(200).json({message: 'Product has been deleted'})
        })
        .catch( err => {
            res.status(500).json({message: 'Internal server error'})
        })
    }
}

module.exports = ProductController