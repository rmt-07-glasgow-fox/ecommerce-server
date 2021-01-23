const router = require('express').Router()
const productRouter = require('./product')
const bannerRouter = require('./banner')
const authController = require('../controllers/authController')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', (req, res) => {
  res.status(200).json({ message: 'e-Commerce CMS, hello admin ^_^'})
})

router.post('/login', authController.login)
router.use(authenticate)
router.use(authorize)
router.use('/products', productRouter)
router.use('/banners', bannerRouter)

module.exports = router