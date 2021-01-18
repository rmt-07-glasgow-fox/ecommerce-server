const { Product } = require('../models')

class ProductController {
    static createProduct (req,res,next) {
        const obj = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(obj)
        .then(data => {
            res.status(201).json({
                id: data.id,
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                stock: data.stock
            })
        })
        .catch (error => {
            next(error)
        })
    }

    static getProduct (req,res,next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
    }

    static editProduct (req,res,next) {
        const obj = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(obj,{where: {id: req.params.id}})
        .then(data => {
            return Product.findOne({where: {id: req.params.id}})
            .then(data2 => {
                res.status(201).json({
                    name: data2.name,
                    imageUrl: data2.imageUrl,
                    price: data2.price,
                    stock: data2.stock
                })
            })
        })           
        .catch (error => {
            next(error)
        })
    }

    static deleteProduct (req,res,next) {
        Product.destroy({where: {id: req.params.id}})
        .then(data => {
            res.status(200).json({message: "Product deleted"})
        })
        .catch (error => {
            next(error)
        })
    }
}

module.exports = ProductController