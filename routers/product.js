const product = require('express').Router()
const products = require('../controller/product')

product.get('/product', products.readProduct)
product.post('/product', products.createProduct)

module.exports = product