const { Product } = require('../models/index')

class productController {
    static findAll(req, res, next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static insert(req, res, next) {
        // console.log(req.body);
        let obj = {
            name:req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            categoryId: req.body.categoryId,
        }
        Product.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next) {
        let id = +req.params.id
        let obj = {
            name:req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            categoryId: req.body.categoryId,
        }
        Product.update(obj,{
            where: {
                id
            },
            returning: true
        })
        .then((data) => {
            if(data[0]) {
                res.status(200).json(data[1])
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static patch(req, res, next) {
        let id = +req.params.id
        let obj = { categoryId:req.body.categoryId }
        Product.update(obj, {
            where: {
                id
            },
            returning: true
        })
        .then((data) => {
            if(data[0]){
                res.status(200).json(data[1])
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let id = +req.params.id
        let deleted = {
            name: 'Product Deleted' 
        }
        Product.destroy({
            where: {
                id
            }
        })
        .then((data) => {
            if(data === 1) {
                res.status(200).json(deleted)
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch((err) =>  {
            next(err)
        })
    }
}

module.exports = productController