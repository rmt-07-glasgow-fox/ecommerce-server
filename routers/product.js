const router = require('express').Router();
const ProductController = require('../controllers/productController.js');

router.post('/', ProductController.createProduct);

module.exports = router;