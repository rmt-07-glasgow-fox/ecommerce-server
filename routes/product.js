const express = require('express')
const router = express.Router()
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')
const Product = require('../controllers/product')

router.use(authentication)
router.get('/', authorization, Product.getAll)
router.get('/:id', authorization,Product.getById)
router.post('/', authorization, Product.createProduct)
router.put('/:id', authorization, Product.editProduct)
router.delete('/:id', authorization, Product.deleteProduct)

module.exports = router