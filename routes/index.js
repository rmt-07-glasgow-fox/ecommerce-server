const router = require('express').Router()

const userRouter = require('./user')
const productRoute = require('./product')

const { auth } = require('../middleware/auth')

router.use('/', userRouter)
router.use('/products',auth, productRoute)


module.exports = router