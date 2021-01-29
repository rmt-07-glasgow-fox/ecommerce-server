const router = require('express').Router()
const routerAuth = require('./auth.js')
const routerProduct = require('./product.js')
const routerCart = require('../routes/cart.js')
const Controller = require('../controllers')
const { authenticate } = require('../middlewares/auth.js')

router.get('/', Controller.welcome)
router.get('/categories', Controller.showCategories)
router.get('/banners', Controller.showBanners)
router.use(routerAuth)
router.use('/products', routerProduct)

router.use(authenticate)
router.use('/cart', routerCart)
// router.use('/wishlist')
// router.use('/transaction')

module.exports = router