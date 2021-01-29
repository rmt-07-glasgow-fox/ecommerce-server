const { Product } = require('../models')

class productController {
    static getProducts(req, res, next){
        Product.findAll()
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            next(err)
        })
    }

    static getOneProduct(req, res, next){
        const id = req.params.id
        Product.findOne({
            where : {
                id
            }
        })
        .then(product => {
            if(product === null){
                next({name : "Not found"})
            } else {
                res.status(200).json(product)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static postProduct(req, res, next){
        const product = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : +req.body.price,
            stock : +req.body.stock,
            UserId : +req.user.id
        }
        Product.create(product)
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static patchProduct(req, res, next){
        let id = +req.params.id
        const product = {
            stock : +req.body.stock
        }
        Product.update(product, {
            where : {
                id
            }
        })
        .then(data => {
            if(data[0] === 1){
                return Product.findOne({
                    where : {
                        id
                    }
                })
            }
        })
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static putProduct(req, res, next){
        let id = +req.params.id
        const product = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : +req.body.price
        }
        Product.update(product, {
            where : {
                id
            }
        })
        .then(data => {
            if(data[0] === 1){
                return Product.findOne({
                    where : {
                        id
                    }
                })
            }
        })
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteProduct(req, res, next){
        let id = +req.params.id
        Product.destroy({
            where : {
                id
            }
        })
        .then(product => {
            if(product === 1){
                res.status(200).json({message : "Product Deleted"})
            } 
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = productController