const {User,Product} = require('../../models/index')

function seederUser(done) {
    const body = {
        firstname:'some',
        lastname:'one',
        email: 'a@gmail.com',
        password: '123456',
        role: 'admin'
    }

    if (process.env.NODE_ENV == 'test') {
        return User.create(body)
    }
}

function seederProduct(done) {
    const body = {
        name:'card',
        imageUrl:'url',
        price: 200000,
        stock: 20
    }

    if (process.env.NODE_ENV == 'test') {
        return Product.create(body)
    }
}

module.exports = {seederUser,seederProduct}