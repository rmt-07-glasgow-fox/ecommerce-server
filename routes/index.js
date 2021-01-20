const express = require('express')
const router = express.Router()
const user = require('./user')
const product = require('./product')
const productCus = require('./productCus')
const carts = require('./carts')

router.use('/', user)
router.use('/products', product)
router.use('/carts', carts)
router.use('/customer', productCus)

module.exports = router