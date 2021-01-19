const product = require('express').Router()
const products = require('../controller/product')
const { authorization } = require('../middleware/auth')

product.get('/products', products.readProduct)
product.post('/products', products.createProduct)
product.put('/products', authorization, products.update)
product.delete('/products', authorization, products.delete)

module.exports = product