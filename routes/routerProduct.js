const ProductController = require('../controller/productController')
const router = require('express').Router()
 

router.post('/create', ProductController.create)


module.exports = router