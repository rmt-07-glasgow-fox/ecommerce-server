const router = require('express').Router();
const CartController = require('../controllers/cartController');
const { authenticate } = require('../middlewares/auth');

router.use(authenticate);
router.post('/', CartController.addCart);
router.get('/', CartController.getCarts);
router.patch('/', CartController.patchCart);
router.put('/:id', CartController.putCart);
router.delete('/:id', CartController.deleteCart);

module.exports = router;