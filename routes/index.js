const express = require('express')
const router = express.Router()
const user = require('./user-router')
const product = require('./product-router')
const { authenticate } = require('../middleware/auth')

router.use('/', user )
router.use(authenticate)
router.use('/', product )

module.exports = router