const router = require('express').Router()
const Controller = require('../controllers/productController')
const {authorize} = require('../middlewares/auth')

router.get('/', authorize,Controller.getProduct)
router.get('/:id', authorize,Controller.getProductById)
router.post('/', authorize, Controller.addProduct)
router.put('/:id', authorize, Controller.updateProduct)
router.delete('/:id', authorize, Controller.deleteProduct)

module.exports = router