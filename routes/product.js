const router = require('express').Router()
const ControllerProduct = require('../controllers/controllerProduct.js')
const authorize = require('../middlewares/auth.js').authorize()

router.get('/', ControllerProduct.showProducts)
router.post('/', ControllerProduct.addProduct)

// router.use(authorize)
// router.get('/:id', ControllerProduct.showProduct)
// router.put('/:id', ControllerProduct.editProduct)
// router.patch('/:id', ControllerProduct.patchProduct)
// router.delete('/:id', ControllerProduct.deleteProduct)

module.exports = router