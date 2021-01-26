const router = require('express').Router()

const userRouter = require('./user')
const productRoute = require('./product')
const bannerRoute = require('./banner')

const { auth } = require('../middleware/auth')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'get server e-commerce'
    })
})

router.use('/', userRouter)
router.use('/products',auth, productRoute)
router.use('/banners',auth, bannerRoute)

module.exports = router