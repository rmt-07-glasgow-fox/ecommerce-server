const router = require('express').Router()
const productController = require('../controllers/productController')

router.post('/', productController.createProduct)
router.get('/', productController.getProduct)

router.get('/:id', productController.getOneProduct)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)

module.exports = router