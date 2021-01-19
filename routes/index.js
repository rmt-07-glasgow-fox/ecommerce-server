const router = require('express').Router()
const productRouter = require('./product')
const authController = require('../controllers/authController')
const { authenticate, authorize } = require('../middlewares/auth')

router.post('/login', authController.login)

router.use(authenticate)
router.use(authorize)
router.use('/products', productRouter)

module.exports = router