const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAll);
router.post('/', productController.store);


module.exports = router