const routs = require('express').Router()
const product = require('../controllers/product')
const cart = require('./cart')
const wishlist = require('./wishlist')
const history = require('./history')
const {authorization,authentication} = require('../midleware/auth')

routs.get('/product',product.findAll)
routs.get('/product/:id',product.findOne)
routs.use(authentication)
routs.use('/',history)
routs.use('/product/:id',cart)
routs.use('/product/:id',wishlist)
routs.use(authorization)
routs.post('/product',product.add)
routs.put('/product/:id',product.put)
routs.delete('/product/:id',product.delete)

module.exports = routs