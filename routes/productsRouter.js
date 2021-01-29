const router = require ('express').Router()
const ProductController = require ('../controller/ProductController')
const { authorize, authenticateAdmin, authenticate } = require ('../middlewares/auth')

router.get ('/products', ProductController.getProduct)

router.get ('/products/:id', ProductController.getOneProduct)

router.patch ('/products/:id', authenticate, ProductController.patchProductAndUpdateBalance)

router.post ('/products', authenticateAdmin, ProductController.postProduct)

router.put ('/products/:id', authenticateAdmin, ProductController.putProduct)

router.delete ('/products/:id', authenticateAdmin, ProductController.deleteProduct)

module.exports = router