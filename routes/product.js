const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getProductList)
router.post('/', ProductController.create)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)


module.exports = router