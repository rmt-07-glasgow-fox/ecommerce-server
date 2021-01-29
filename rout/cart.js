const routs = require('express').Router({ mergeParams: true })
const cart = require('../controllers/cart')

routs.get('/cart',cart.findUnpaid)
routs.post('/cart',cart.addToCart)
routs.put('/cart/:cartid',cart.put)
routs.delete('/cart/:cartid',cart.delete)
routs.delete('/cart/:cartid/all',cart.deleteCart)
routs.post('/cart/:cartid',cart.checkout)

module.exports = routs