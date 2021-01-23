const router = require('express').Router()
const productRouter = require('./product')
const Controller = require('../controllers/userController')
const { authentication } = require('../middlewares/auth')

router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.use(authentication)
router.use('/products', productRouter)

module.exports = router