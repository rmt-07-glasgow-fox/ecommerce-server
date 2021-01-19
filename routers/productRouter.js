const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.post('/', ProductController.postProduct)
router.get('/', ProductController.getProduct)


router.put('/:id', ProductController.putProductById)
router.patch('/:id', ProductController.patchProductById)
router.delete('/:id', ProductController.deleteProductById)


module.exports = router