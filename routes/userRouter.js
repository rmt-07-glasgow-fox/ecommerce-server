const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { authenticate } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/products', authenticate, UserController.fetchUserProducts)
router.post('/add-to-cart', authenticate, UserController.addToCart)
router.post('/buy', authenticate, UserController.buyProduct)
router.put('/updated', authenticate, UserController.updateCart) 
router.patch('/wishlist', authenticate, UserController.addWishlist)
router.delete('/product', authenticate, UserController.deleteProduct)

module.exports = router;