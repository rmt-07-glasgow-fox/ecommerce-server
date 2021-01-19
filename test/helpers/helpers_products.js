const { Product } = require('../../models')

function clearProducts() {
    if (process.env.NODE_ENV === 'test') {
        return Product.destroy({ where: {}})
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
        return Product.create(obj)
    }
}

module.exports = { clearProducts, createProduct }
