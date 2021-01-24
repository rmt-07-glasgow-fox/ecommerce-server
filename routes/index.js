const router = require('express').Router()

const userRouter = require('./user')
const productRoute = require('./product')

const { auth, author } = require('../middleware/auth')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'get server e-commerce'
    })
})

router.use('/', userRouter)
router.use('/products',auth, author, productRoute)


module.exports = router