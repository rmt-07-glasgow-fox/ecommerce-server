const router = require('express').Router()

const userRouter = require('./user')
const productRoute = require('./product')
const bannerRoute = require('./banner')
const cartRoute = require('./cart')
const wishRouter = require('./wishlist')
const transactionRoute = require('./transaction')

const { auth } = require('../middleware/auth')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'get server e-commerce'
    })
})

router.use('/', userRouter)
router.use('/products',auth, productRoute)
router.use('/banners',auth, bannerRoute)
router.use('/carts',auth, cartRoute)
router.use('/wishlists',auth, wishRouter)
router.use('/transactions',auth, transactionRoute)


module.exports = router