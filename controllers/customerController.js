const { Product, User, Cart, CartProduct } = require('../models');

class Controller {
    static createCart(req, res, next) {
        const UserId = req.headers.user.id;
        const { ProductId, quantity } = req.body;
        Cart.findOrCreate({
            where: {
                UserId,
                status: 'false'
            },
            defaults: {
                UserId,
                status: false
            }
        })
        .then(cart => {
            return CartProduct.findOrCreate({
                where: {
                    CartId: cart[0].id,
                    ProductId
                },
                defaults: {
                    CartId: cart[0].id,
                    ProductId,
                    quantity
                },
                include: ['Product', 'Cart']
            })
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
    };

    static readProduct(req, res, next) {
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

    static readCart(req, res, next) {
        const UserId = req.headers.user.id
        Cart.findOne({
            where: {
                UserId,
                status: 'false'
            }
        })
        .then(cart => {
            return CartProduct.findAll({
                order: [['id', 'ASC']],
                where: {
                    CartId: cart.id
                },
                include: ['Product', 'Cart']
            })
        })
        .then(cartProduct => {
            res.status(200).json(cartProduct);
        })
        .catch(err => {
            err.name = 'There is no active Cart';
            next(err);
        });
    };

    static readOneProduct(req, res, next) {
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

    static readOneCartProduct(req, res, next) {
        const { id } = req.params;
        CartProduct.findOne({ where: { id } , include: ['Product', 'Cart']})
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

    static editQuantity(req, res, next) {
        const { quantity } = req.body;
        const id = +req.params.id;
        CartProduct.update({ quantity }, { where: { id } , returning: true})
        .then(cartProduct => {
            if (cartProduct[0]) {
                res.status(200).json(cartProduct[1]);
            } else {
                throw { name: 'Cart Product not found'};
            }
        })
        .catch(err => {
            next(err);
        });
    };

    static editCart(req, res, next) {
        const { status } = req.body;
        const id = +req.params.id;
        Cart.update({ status }, { where: { id } , returning: true})
        .then(cartProduct => {
            if (cartProduct[0]) {
                res.status(200).json(cartProduct[1]);
            } else {
                throw { name: 'Cart not found'};
            }
        })
        .catch(err => {
            next(err);
        });
    };

    static deleteCartProduct(req, res, next) {
        const id = +req.params.id;
        console.log(id);
        CartProduct.destroy({ where: { id } })
        .then(cartProduct => {
            if (cartProduct) {
                res.status(200).json({ message: "Cart Product has been deleted"});
            } else {
                throw { name : "Cart Product not found"};
            }
        })
        .catch(err => {
            next(err);
        });
    };
}

module.exports = Controller;