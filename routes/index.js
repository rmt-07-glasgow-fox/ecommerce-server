const express = require('express')
const router = express.Router()
const user = require('./user-router')
const product = require('./product-router')

router.use('/', user )
router.use('/', product )

module.exports = router