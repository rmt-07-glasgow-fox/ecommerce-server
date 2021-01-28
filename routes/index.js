const express = require('express')
const router = express.Router()
const user = require('./user')
const product = require('./product')
const cart = require('./cart')
const { authenticate } = require('../middleware/auth')

router.use('/', user)
router.use(authenticate)
router.use('/products', product)
router.use('/carts', cart)

module.exports = router;