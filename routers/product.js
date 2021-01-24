const product = require('express').Router()
const productControl = require('../controller/product')
const { authorization } = require('../middleware/auth')

product.get('/products', productControl.readProduct)
product.post('/products', authorization,productControl.createProduct)
product.put('/products/:id', authorization, productControl.update)
product.delete('/products/:id', authorization, productControl.delete)

module.exports = product