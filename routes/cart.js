const router = require('express').Router()
const cartController = require('../controllers/cartController')
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)
router.get('/', cartController.getCarts)
router.get('/histories', cartController.getHistories)
router.post('/', cartController.addToCart)
router.patch('/checkout/', cartController.checkout)
router.patch('/additem/:id', cartController.addItem)
router.patch('/minitem/:id', cartController.minItem)
router.delete('/:id', cartController.deleteCart)

module.exports = router