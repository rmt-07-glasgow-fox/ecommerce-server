const { Product } = require('../../models')

const clearProduct = () => {
    if (process.env.NODE_ENV === 'test') {
        return Product.destroy({ where: {} })
    }
}

module.exports = clearProduct; 