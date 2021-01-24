const express = require('express')
const router = express.Router()
const user = require('./user')
const product = require('./product')
const { authenticate } = require('../middleware/auth')

router.use('/users', user)
router.use(authenticate)
router.use('/products', product)

module.exports = router;