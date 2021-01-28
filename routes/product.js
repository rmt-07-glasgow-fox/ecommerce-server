const router = require('express').Router()
const Controller = require('../controllers/productController')
const {authentication, authorize} = require('../middlewares/auth')

router.get('/', Controller.getProduct)
router.get('/:id', Controller.getProductById)

router.use(authentication)
router.post('/', authorize, Controller.addProduct)
router.put('/:id', authorize, Controller.updateProduct)
router.delete('/:id', authorize, Controller.deleteProduct)

module.exports = router