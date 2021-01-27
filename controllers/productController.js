const { Product, User, Cart } = require('../models')
const { cekToken } = require('../helpers/jwt')

class ProductController {
    static showAllList (req, res, next) {
        Product.findAll()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            next(err)
        })
    }

    static getById (req, res, next) {
        let id = +req.params.id
        Product.findByPk(id)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            next(err)
        })
    }

    static create (req, res, next) {
        const cekAdmin = cekToken(req.headers.access_token).role
        if (cekAdmin === 'admin') {
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
            .catch(err => {
                next(err)
            })
        } else {
            next({name: "unauthorized"})
        }
    }

    static update(req, res, next) {
        const cekAdmin = cekToken(req.headers.access_token).role
        if (cekAdmin === 'admin') {
            let id = +req.params.id
            let payload = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }
            Product.update(payload, { where: {id} })
            .then(data => {
                if(data[0] === 0) {
                    next({name: "resourceNotFound"})
                } else {
                    return res.status(200).json({msg: "Success Update"});
                }
            })
            .catch(err => {
                next(err)
            })
        } else {
            next({name: "unauthorized"})
        }
    }

    static deleteData (req, res, next) {
        if (cekAdmin === 'admin') {
            let id = +req.params.id
            Product.destroy({ where: {id} })
            .then(data => {
                if (data === 0){
                    next({name: "resourceNotFound"})
                } else {
                    res.status(200).json({ msg: "Success Delete Data" });
                }
            })
            .catch(err => {
                next(err)
            })
        } else {
            next({name: "unauthorized"})
        }
    }
}

module.exports = ProductController