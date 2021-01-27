const router = require('express').Router();
const CartController = require('../controllers/cartController.js');

router.get('/', CartController.readCart);
router.post('/', CartController.createCart);
router.put('/:id', CartController.updateCart);
router.delete('/:id', CartController.deleteCart);

module.exports = router;