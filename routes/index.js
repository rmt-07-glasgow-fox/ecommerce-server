const router = require('express').Router()
const Auth = require('../middlewares/auth')
const auth = require('./auth')
const product = require('./product')
const banner = require('./banner')
const category = require('./category')
const { errorHandlers } = require('../middlewares/errorHandlers')

router.get('/', (req, res) => {
  res.send('Welcome to ECommerce Server by Hanii!')
})

router.use(auth)
router.use(Auth.authentication)
router.use('/products', product)
router.use('/banners', banner)
router.use('/categories', category)

router.use(errorHandlers)

module.exports = router