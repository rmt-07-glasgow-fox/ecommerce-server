const router = require('express').Router()
const UserController = require('../controllers/userController')
const adminRouter = require('./admin')
const customerRouter = require('./customer')
const cartRouter = require('./cart')
const wishlistRouter = require('./wishlist')


router.use('/admin', adminRouter)
router.use('/customer', customerRouter)
router.use('/cart', cartRouter)
router.use('/wishlist', wishlistRouter)

router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router