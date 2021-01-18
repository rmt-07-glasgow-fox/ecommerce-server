const { ProductController } = require('../controllers')
const express = require('express')
const router = express.Router()

router.post('/', ProductController.addProducts)

module.exports = router