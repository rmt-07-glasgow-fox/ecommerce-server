const { ProductController } = require('../controllers/productController')

const router = require('express').Router()

router.post('/', ProductController.create)

module.exports = router