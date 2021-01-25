const routs = require('express').Router()
const product = require('../controllers/product')
const {authorization,authentication} = require('../midleware/auth')

routs.get('/product',product.findAll)
routs.use(authentication)
routs.use(authorization)
routs.post('/product',product.add)
routs.put('/product/:id',product.put)
routs.delete('/product/:id',product.delete)
routs.get('/product/:id',product.findOne)

module.exports = routs