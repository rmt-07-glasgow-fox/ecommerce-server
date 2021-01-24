const router = require ('express').Router()
const ProductController = require ('../controller/ProductController')
const { authorize, authenticate } = require ('../middlewares/auth')

router.get ('/products', ProductController.getProduct)

router.get ('/products/:id', ProductController.getOneProduct)

router.use (authenticate)

router.post ('/products', ProductController.postProduct)

router.put ('/products/:id', ProductController.putProduct)

router.delete ('/products/:id', ProductController.deleteProduct)

module.exports = router