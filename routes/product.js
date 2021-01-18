const ProductController = require('../controllers/productController.js')
const router = require('express').Router();

router.get('/', ProductController.showAllList)
router.post('/', ProductController.create)

module.exports = router