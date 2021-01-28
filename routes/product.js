const express = require('express')
const router = express.Router()
const Controller = require('../controller/productCont')
const { authenticate, authorize } = require('../middleware/auth')

router.get('/', Controller.getAllProducts)
router.use(authenticate)
router.post('/', authorize, Controller.createProduct)
router.put('/:id', authorize, Controller.updateProduct)
router.delete('/:id', authorize, Controller.deleteProduct)

module.exports = router;