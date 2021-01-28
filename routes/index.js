const router = require('express').Router()
const productRouter = require('./product')
const bannerRouter = require('./banner')
const cartRouter = require('./cart')
const authController = require('../controllers/authController')

router.get('/', (req, res) => {
  res.status(200).json({ message: 'e-Commerce CMS, hello admin ^_^'})
})

router.post('/login', authController.login)
router.post('/register', authController.register)

router.use('/carts', cartRouter)
router.use('/products', productRouter)
router.use('/banners', bannerRouter)

module.exports = router