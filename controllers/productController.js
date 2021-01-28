const { User, Product, Cart } = require('../models/index')

class Controller {
    static addProduct(req, res, next) {
        const newData = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(newData)
        .then( product => {
            return res.status(201).json(product)
        })
        .catch( err => {
            next(err)
        })
    }

    static updateProduct(req, res, next) {
        const newData = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        const condition = {
            where: {
                id: req.params.id
            }
        }
        Product.update(newData, condition)
        .then( response => {
            res.status(200).json({message: 'update success'})
        })
        .catch( err => {
            next(err)
        })
    }

    static getProduct(req, res, next) {
        Product.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getProductById(req, res, next) {
        const condition = {
            where: {
                id: +req.params.id
            }
        }
        Product.findOne(condition, {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                next({name: 'notFound'})

            }

        })
        .catch(err => {
            next(err)
        })
    }

    static deleteProduct(req, res, next) {
        let condition = {
            where: {
                id: +req.params.id
            }
        }
        Product.destroy(condition)
        .then(data  => {
            if (data === 1) {
                res.status(200).json({message: 'delete success'})
            } else {
                next({name: 'notFound'})
            }
        })
        .catch(err => {
            next(err)        
        })
    }
}

module.exports = Controller