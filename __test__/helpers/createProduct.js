const { Product } = require('../../models');

module.exports = () => {
    if (process.env.NODE_ENV === 'test') {
        return Product.create({ 
            name: 'Kaktus Hijau',
            image_url: 'google.com',
            price: 500,
            stock: 10
        })
    }
}