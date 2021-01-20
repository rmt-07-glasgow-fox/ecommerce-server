const { Product } = require('../../models')
const { User } = require('../../models')
const { generateToken } = require('../../helpers/jwt')

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

async function getToken() {
    if (process.env.NODE_ENV === 'test') {
        let token = ''
        try {
            const obj = {
                email: 'tes5@mail.com',
                password: '123123',
                role: 'admin'
            }
            User.create(obj)
            .then(data => {
                console.log(data.id, data.email, data.role, 'ini data dri helper')
                const payload = {
                    id: data.id,
                    email: data.email
                }
                const access_token = generateToken(payload)
                console.log(access_token, 'ini dari heloper')
                token = access_token
                return token
            })
            .catch(err => {
                console.log(err)
            })
            
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = { clearProducts, createProduct, getToken }
