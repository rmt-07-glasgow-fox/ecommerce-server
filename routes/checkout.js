const router = require('express').Router()
const Checkout = require('../controllers/checkOut')
const authentication = require('../middlewares/authentication')
const authorizationCus = require('../middlewares/authorizationCus.js')


router.use(authentication)
router.use('/:id',authorizationCus)
router.get('/', Checkout.getCartChekout)
router.post('/', Checkout.checkout)

module.exports = router