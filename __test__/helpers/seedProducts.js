const { Product } = require('../../models/')

const users = [
    {
        name: 'nice headphones',
        image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
        price: 120000,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'nice headphones',
        image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
        price: -120000,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'nice headphones',
        image_url: 'https://media.wired.com/photos/5e7164aeb9399f00096a2ae6/1:1/w_1800,h_1800,c_limit/Gear-Mont-Blanc-Smart-Headphones-Gold-Front-SOURCE-Mont-Blanc.jpg',
        price: 120000,
        stock: -5,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

const seedProducts = () => {
    return Product.bulkCreate(users)
}

module.exports = seedProducts
