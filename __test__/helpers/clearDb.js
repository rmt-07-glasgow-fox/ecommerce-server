const { Category, Product } = require('../../models');

const clearCategory = () => {
    if (process.env.NODE_ENV === 'test') {
        return Category.destroy({ where: {}});
    }
}

const clearProduct = () => {
    if (process.env.NODE_ENV === 'test') {
        return Product.destroy({ where: {}});
    }
}

module.exports = { clearCategory, clearProduct };