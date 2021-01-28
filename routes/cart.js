const router = require('express').Router()
const Controller = require('../controllers/cartController.js')
const {authentication, authorize} = require('../middlewares/auth')

router.use(authentication)
router.get('/', Controller.showCart)
router.post('/', Controller.addToCart)
router.delete('/', Controller.deleteCart)
router.patch('/:id', Controller.updateQuantity)

module.exports = router