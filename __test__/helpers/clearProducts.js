const { Product } = require('../../models');

module.exports = () => {
    if (process.env.NODE_ENV === 'test') {
        return Product.destroy({ where: { }})
    }
}