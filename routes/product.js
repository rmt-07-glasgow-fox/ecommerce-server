const router = require('express').Router()
const { adminAuthenticate } = require('../middlewares/auth')
const productController = require('../controllers/productController')

// router.use(adminAuthenticate)
router.get('/product', productController.read)
router.post('/product', productController.create)
router.get('/product/:id', productController.edit)
router.put('/product/:id', productController.update)
router.delete('/product/:id', productController.delete)

module.exports = router