const router = require('express').Router()
const ControllerProduct = require('../controllers/controllerProduct.js')
const { authenticate, authorize } = require('../middlewares/auth.js')

router.get('/', ControllerProduct.showProducts)

router.use(authenticate)
router.post('/', ControllerProduct.addProduct)

router.use('/:id', authorize)
router.get('/:id', ControllerProduct.showProduct)
router.put('/:id', ControllerProduct.editProduct)
router.patch('/:id', ControllerProduct.patchProduct)
router.delete('/:id', ControllerProduct.deleteProduct)

module.exports = router