const { Product } = require('../models');

class Controller {
    static create(req, res, next) {
        const { role } = req.headers.user;
        if (role === 'admin') {
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
        } else {
            res.status(403).json({ msg: "This user is not admin"});
        }
    }

    static read(req, res, next) {
        const { role } = req.headers.user;
        if (role === 'admin') {
            Product.findAll()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(400).json(err);
            });
        } else {
            res.status(403).json({ msg: "This user is not admin"});
        }
    };

    static update(req, res, next) {
        const { role } = req.headers.user;
        if (role === 'admin') {
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
        } else {
            res.status(403).json({ msg: "This user is not admin"});
        }
    };

    static editStock(req, res, next) {
        const { role } = req.headers.user;
        const { stock } = req.body;
        const id = +req.params.id;
        
        if (role === 'admin') {
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
        } else {
            res.status(403).json({ msg: "This user is not admin"});
        };
    };

    static delete(req, res, next) {
        const { role } = req.headers.user;
        const id = +req.params.id;

        if (role === 'admin') {
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
        } else {
            res.status(403).json({ msg: "This user is not admin"});
        };
    };
}

module.exports = Controller;