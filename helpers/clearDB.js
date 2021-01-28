const { User, Product } = require('../models/index')

function clearDB() {
    if (process.env.NODE_ENV === 'test') {
        return Product.destroy({ where: {}})
    }
}

function clearDBUser() {
    if (process.env.NODE_ENV === 'test') {
        return User.destroy({ where: {}})
    }
}

module.exports = {
    clearDB,
    clearDBUser
}