const { User } = require('../../models')

function clearUsers() {
    if (process.env.NODE_ENV === 'test') {
        return User.destroy({ where: {}})
    }
}

function createProduct() {
    if (process.env.NODE_ENV === 'test') {
        const obj = {
            name: 'tes',
            image_url: 'tes2',
            price: 1000,
            stock: 14
        }
        return User.create(obj)
    }
}

module.exports = { clearUsers, createProduct }