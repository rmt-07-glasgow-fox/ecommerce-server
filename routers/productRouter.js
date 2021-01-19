const router = require('express').Router()
const ProductController = require('../controllers/ProductController')


router.post('/', ProductController.postProduct)
router.get('/', ProductController.getProduct)


module.exports = router