const router = require('express').Router();
const cartController = require('../controllers/cartController')

router.get('/cart', cartController.getAll);
router.post('/cart/add', cartController.createOrUpdateCart);
router.delete('/cart/:id/product/:productId', cartController.destroy);

module.exports = router