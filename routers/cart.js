const cart = require('express').Router()
const controller = require('../controller/cart')
const { authenticate } = require('../middleware/auth')

cart.use(authenticate)
cart.get('/cart', controller.readCart)
cart.post('/cart/:id', controller.createCart)
cart.put('/cart/:id', controller.editQuantity)

module.exports = cart