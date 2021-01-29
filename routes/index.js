const express = require('express')
const router = express.Router()
const user = require('./user')
const product = require('./product')
const productCus = require('./productCus')
const carts = require('./carts')
const banner = require('./banner')
const checkout = require('./checkout')

router.use('/', user)
router.use('/products', product)
router.use('/carts', carts)
router.use('/customers', productCus)
router.use('/banners', banner)
router.use('/checkouts', checkout)

module.exports = router