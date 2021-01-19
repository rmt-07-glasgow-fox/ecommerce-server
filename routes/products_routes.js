const express = require('express')
const { route } = require('.')
const router = express.Router()

const { ProductController } = require('../controllers/product_controllers')

router.post('/', ProductController.createProduct)
router.get('/', ProductController.findProduct)

module.exports = router