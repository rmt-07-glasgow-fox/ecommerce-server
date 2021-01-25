const {User,Product} = require('../../models/index')

function cleanUser() {
    if (process.env.NODE_ENV == 'test') {
        return User.destroy({where:{}})
    }
}

function cleanProduct() {
    if (process.env.NODE_ENV == 'test') {
        return Product.destroy({where:{}})
    }
}

module.exports = {cleanUser,cleanProduct}