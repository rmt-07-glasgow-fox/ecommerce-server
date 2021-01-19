const router = require('express').Router()
const productController = require('../controllers/productController')

router.post('/', productController.createProduct)
router.get('/')

router.get('/')
router.put('/:id')
router.patch('/:id')
router.delete('/:id')

module.exports = router