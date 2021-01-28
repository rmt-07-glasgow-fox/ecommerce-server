const CartController = require('../controllers/cartController')
const router = require('express').Router();
const { authorizationCart } = require('../middlewares/index.js');

router.get('/', CartController.getAllCart);
router.post('/', CartController.createCart);
router.put('/:id', authorizationCart, CartController.updateCarts);
router.delete('/:id', authorizationCart, CartController.deleteCart);


module.exports = router