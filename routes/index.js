const express = require('express')
const router = express.Router()
const user = require('./user-router')
const product = require('./product-router')
const cart = require('./cart-router')

router.use('/', user )
router.use('/', product )
router.use('/', cart)

module.exports = router