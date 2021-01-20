const router = require('express').Router()
const Product = require('../controllers/product')


router.get('/products', Product.getAll)

module.exports = router