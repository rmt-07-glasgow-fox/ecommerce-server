const CartController = require('../controllers/cartController')
const router = require('express').Router();
const { authorizationCart } = require('../middlewares/index.js');

router.get('/',  CartController.getAllCart);
router.post('/',  CartController.createCart);
router.put('/:id',  CartController.updateCarts);
router.delete('/:id',  CartController.deleteCart);


module.exports = router