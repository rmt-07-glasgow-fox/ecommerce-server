const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const { authAdmin } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.status(200).json({message: 'welcome to ecommerce app'})
})

router.use(userRouter)
router.use('/products', authAdmin, productRouter)

module.exports = router