const { request } = require('express')

const router = require('express').Router()
const productController = require('../controllers/productController')
const { authorization } = require('../middlewares/authentication')

router.get('/products', productController.getProducts)
router.post('/products', authorization, productController.postProduct)
router.patch('/products/:id', authorization, productController.patchProduct)
router.put('/products/:id', authorization, productController.putProduct)
router.delete('/products/:id', authorization, productController.deleteProduct)

module.exports = router