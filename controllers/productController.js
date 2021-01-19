const { Product } = require('../models')

class ProductController {
    static createProduct (req,res,next) {
        const obj = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        }
        Product.create(obj)
        .then(data => {
            res.status(201).json({
                id: data.id,
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                stock: data.stock,
                category: data.category
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
            id: data.id,
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            stock: data.stock,
            category: data.category
        }
        Product.update(obj,{where: {id: req.params.id}})
        .then(data => {
            return Product.findOne({where: {id: req.params.id}})
            .then(data2 => {
                res.status(201).json({
                    id: data.id,
                    name: data.name,
                    imageUrl: data.imageUrl,
                    price: data.price,
                    stock: data.stock,
                    category: data.category
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
            if (data) {
                res.status(200).json({message: "Product deleted"})
            } else {
                throw {
                    status: 404,
                    message: 'Product not found'
                }
            }
        })
        .catch (error => {
            next(error)
        })
    }
}

module.exports = ProductController