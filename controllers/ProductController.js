const { Product } = require('../models')

class ProductController {
    static getProductList(req, res, next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.create(obj)
        .then(product => {
            res.status(201).json(product)
        })
        .catch(next)
    }

    static update(req, res, next) {
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        // console.log('update');
        Product.update(obj, {
            where: {id: +req.params.id},
            returning: true
        })
        .then(result => {
            // console.log(result);
            if (!result) {
                next({name: 'NotFound', message: 'data not found'})
            } else {
                res.status(200).json(result[1][0])
            }
        })
        .catch(err => next(err))
    }

    static delete(req, res, next) {
        Product.destroy({
            where: {id: +req.params.id}
        })
        .then(result =>{
            if (!result) {
                next({name: 'NotFound', message: 'data not found'})
            } else {
                res.status(200).json({message: 'product success to delete'})
            }
        })
        .catch(err => next(err))
    }
}

module.exports = ProductController