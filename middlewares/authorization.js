const { User, CartProduct } = require('../models');

function authorization(req, res, next) {
    const id = req.headers.user.id;
    User.findOne({ where: { id } })
    .then(user => {
        console.log(user);
        if (user) {
            if (user.role === 'admin') {
                next();
            } else {
                throw { name: "This user is not admin" };
            }
        } else {
            throw { name: "Please login / register first"};
        }
    })
    .catch(err => {
        next(err);
    });
};

function authorizationCustomer(req, res, next) {
    const id = req.headers.user.id;
    User.findOne({ where: { id } })
    .then(user => {
        if (user) {
            if (user.role === 'customer') {
                next();
            } else {
                throw { name: "Please login / register first" };
            }
        } else {
            throw { name: "Please login / register first"};
        }
    })
    .catch(err => {
        next(err);
    });
};

function authorizationId(req, res, next) {
    const id = req.headers.user.id;
    const idCartProduct = req.params.id;
    CartProduct.findOne({ where: { id: idCartProduct }, include: ['Product', 'Cart'] })
    .then(cartProduct => {
        if ( cartProduct.Cart.UserId === id) {
            next();
        } else {
            throw { name: "You not authorize to continue" };
        }
    })
    .catch(err => {
        next(err);
    });
};

module.exports = {
    authorization,
    authorizationCustomer,
    authorizationId
};