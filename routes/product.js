const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authAdmin } = require('../middlewares/auth')

router.get('/', ProductController.getProductList)
router.post('/', authAdmin, ProductController.create)
router.put('/:id', authAdmin, ProductController.update)
router.delete('/:id', authAdmin, ProductController.delete)


module.exports = router