const router = require('express').Router()
const { patchUserCart } = require('../controllers/CartController')
const CartController = require('../controllers/CartController')
const { authorizeUser } = require('../middlewares/auth')

router.get('/', CartController.getUserCart)
router.post('/:id', CartController.create)
router.patch('/:id', authorizeUser, CartController.patchUserCart)
router.delete('/:id', authorizeUser, CartController.deleteUserCart)

module.exports = router