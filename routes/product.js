const express = require('express')
const router = express.Router()
const Controller = require('../controller/productCont')

router.get('/', Controller.getAllProducts)
router.post('/', Controller.createProduct)
router.put('/:id', Controller.updateProduct)
router.delete('/:id', Controller.deleteProduct)

module.exports = router;