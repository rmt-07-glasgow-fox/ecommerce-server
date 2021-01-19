const router = require('express').Router()
const productController = require('../controllers/productController')

router.post('/', productController.createProduct)
router.get('/')

router.get('/')
router.put('/:id', productController.update)
router.patch('/:id')
router.delete('/:id', productController.delete)

module.exports = router