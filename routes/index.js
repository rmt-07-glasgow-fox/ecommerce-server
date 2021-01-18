const express = require('express')
const router = express.Router()
const admin = require('./admin-router')

router.use('/admin', admin )

module.exports = router