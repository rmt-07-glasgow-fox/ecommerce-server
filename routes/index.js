const router = require('express').Router()

const userRouter = require('./user')
const productRoute = require('./product')

const { auth, author } = require('../middleware/auth')

router.use('/', userRouter)
router.use('/products',auth, author, productRoute)


module.exports = router