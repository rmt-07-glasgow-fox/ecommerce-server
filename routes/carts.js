const router = require('express').Router()
const Cart = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const authorizationCus = require('../middlewares/authorizationCus.js')

router.use(authentication)
router.use('/:id',authorizationCus)
router.get('/', Cart.getAll)
router.post('/', Cart.addCart)
router.put('/:id', Cart.updateCart)
router.delete('/:id', Cart.deleteCart)

module.exports = router;