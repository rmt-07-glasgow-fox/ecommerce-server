const router = require('express').Router()

const productController = require('../controllers/productController')

router.post('/product', productController.create)
router.get('/product', productController.read)
router.get('/product/:id', productController.edit)
router.put('/product/:id', productController.update)
router.delete('/product/:id', productController.delete)

module.exports = router