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
            next(err);
        });
    }

    static read(req, res, next) {
        Product.findAll({
            order: [['id', 'ASC']]
        })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            next(err);
        });
    };

    static readOne(req, res, next) {
        const { id } = req.params;
        Product.findOne({ where: { id } })
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                throw { name: "resourceNotFound"}
            }
        })
        .catch(err => {
            next(err);
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
                throw { name: "Product not found"};
            }
        })
        .catch(err => {
            next(err);
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
                throw { name: 'Product not found'};
            }
        })
        .catch(err => {
            next(err);
        });
    };

    static delete(req, res, next) {
        const id = +req.params.id;
        Product.destroy({ where: { id } })
        .then(product => {
            if (product) {
                res.status(200).json({ message: "Product has been deleted"});
            } else {
                throw { name : "Product not found"};
            }
        })
        .catch(err => {
            next(err);
        });
    };
}

module.exports = Controller;