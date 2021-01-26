const router = require('express').Router()
const CartController = require('../controllers/CartController')
const { userAuthentication } = require('../middlewares/auth')

router.use(userAuthentication)
router.get('/', CartController.getCartByUserId)
router.post('/:productId', CartController.addCart)
router.patch('/:id', CartController.patchCartStatus)

module.exports = router