const customer = require('express').Router()
const controller = require('../controller/cart')
const controllerProduct = require('../controller/product')
const { authenticate } = require('../middleware/auth')


customer.get('/customer/products', controllerProduct.readProduct)

customer.use(authenticate)
customer.get('/cart', controller.readCart)
customer.post('/cart/:id', controller.createCart)
customer.put('/cart/:id', controller.editQuantity)
customer.delete('/cart/:id', controller.deleteCart)

module.exports = customer