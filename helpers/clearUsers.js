const { User, Product } = require('../models');

function createUser(payload) {
    if (process.env.NODE_ENV === 'test') {
        return User.create(payload);
    }
}

function clearUsers() {
    if (process.env.NODE_ENV === 'test') {
        return User.destroy({ where: [] });
    }
};

function clearProducts() {
    if (process.env.NODE_ENV === 'test') {
        return Product.destroy({ where: [] });
    }
};

module.exports = {
    clearUsers,
    clearProducts,
    createUser
};