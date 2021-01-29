const { Product } = require('../../models')

 function seedDummy() {
    if (process.env.NODE_ENV === 'test') {
        return Product.create({
            name: "The Second's Coming Gluttony Book 1",
            image_url: "https://cdn.novelupdates.com/images/2019/01/The-Second-Coming-of-Avarice.jpg",
            price: 77777,
            stock: 100,
            UserId: 1
        })
    }
}

module.exports = seedDummy