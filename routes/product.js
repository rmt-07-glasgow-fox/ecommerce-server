const ProductController = require('../controllers/productController.js');
const { authorization } = require('../middlewares/index.js');
const router = require('express').Router();

router.get('/', ProductController.showAllList)
router.post('/', ProductController.create)

router.put('/:id', authorization, ProductController.update)
router.delete('/:id', authorization, ProductController.deleteData)

module.exports = router