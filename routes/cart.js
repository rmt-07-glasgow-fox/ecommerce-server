const router = require('express').Router();
const { authenticate, cartAuthorize } = require('../middlewares/auth.js');

const CartController = require('../controllers/cart.js');

router.use(authenticate);
router.get('/', CartController.getAll);
router.post('/', CartController.addCart);
router.patch('/:id', cartAuthorize, CartController.updateCart)
router.delete('/:id', cartAuthorize, CartController.delete);
router.delete('/checkout/:id', cartAuthorize, CartController.checkout);


module.exports = router;