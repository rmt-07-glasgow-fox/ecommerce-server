const { Product } = require('../models');

class Controller {
    static create(req, res, next) {
        const { name, stock, price, image_url } = req.body;
        const input = {
            name,
            stock,
            price,
            image_url
        }
        Product.create(input)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            let errors = err.errors.map(error => error.message);
            err.errors = errors
            res.status(400).json(err);
        });
    }

    static read(req, res, next) {
        Product.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    };

    static update(req, res, next) {
        const id = +req.params.id;
        const { name, stock, price, image_url } = req.body;
        const input = {
            name,
            stock,
            price,
            image_url
        };
        Product.update(input, { where: { id } , returning: true})
        .then(product => {
            if (product[0]) {
                res.status(200).json(product[1]);
            } else {
                throw { msg: "Product not found"};
            }
        })
        .catch(err => {
            if (err.msg === 'Product not found') {
                res.status(404).json(err);
            } else {
                let errors = err.errors.map(error => error.message);
                err.errors = errors;
                res.status(400).json(err);
            }
        });
    };

    static editStock(req, res, next) {
        const { stock } = req.body;
        const id = +req.params.id;
        Product.update({ stock }, { where: { id } , returning: true})
        .then(product => {
            if (product[0]) {
                res.status(200).json(product[1]);
            } else {
                throw { msg: 'Product not found'};
            }
        })
        .catch(err => {
            if (err.msg === 'Product not found') {
                res.status(404).json(err);
            } else {
                let errors = err.errors.map(error => error.message);
                err.errors = errors;
                res.status(400).json(err);
            }
        });
    };

    static delete(req, res, next) {
        const id = +req.params.id;
        Product.destroy({ where: { id } })
        .then(product => {
            if (product) {
                res.status(200).json({ msg: "Product has been deleted"});
            } else {
                throw { msg: "Product not found"};
            }
        })
        .catch(err => {
            res.status(404).json(err);
        });
    };
}

module.exports = Controller;